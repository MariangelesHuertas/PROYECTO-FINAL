import { BadRequestException, Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, formatResponseObjectMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationEmpresaDto } from './dto';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../usuarios/interface/payload';
import { UsuariosService } from '../usuarios/usuarios.service';
import { FilterEmpresaArray } from './dto/filters-empresa.dto';
import Decimal from 'decimal.js';
import { PaginationEmpresaOfertaNombreDto } from './dto/pagination-empresaOfertaNombre.dto';
const name = "- Empresa -"
@Injectable()
export class EmpresasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
    private readonly jwtService: JwtService,
    private readonly usuarioService: UsuariosService
  ) { }

  onModuleInit() {
    this.databaseErrorService.setLoggerContext(EmpresasService.name)
  }

  async create(createEmpresaDto: CreateEmpresaDto, request: Request) {
    const { ...rest } = createEmpresaDto

    const createUser = await this.usuarioService.create({ ...rest }, request, "Empresas")

    /* if(createUser.data.length !== 0){
      console.log("el usuario se creo - empresa --",createUser.data?.[0].id)
      console.log(createUser , "json")
    } */

    try {
      const result = await this.prisma.empresas.create({
        data: {
          usuario_id: createUser.data?.[0].id,
          empresa: createEmpresaDto.empresa
        }
      })

      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: createUser.data?.[0].token,
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Creamos una ${name}`,
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


  async findAll(paginateEmpresa: PaginationEmpresaDto, filtros: FilterEmpresaArray, request: Request) {

    const { limit = 10, page = 1, empresa, ubicacion = undefined, sortColumn = "id", sortOrder = "asc" } = paginateEmpresa;
    const { palabras_claveArray, sectoresArray, tamanioArray, valoraciones_empresasArray } = filtros

    const palabras_claves = (palabras_claveArray && palabras_claveArray.length === 0) ? undefined : palabras_claveArray
    const sectores = (sectoresArray && sectoresArray.length === 0) ? undefined : sectoresArray;
    const tamanio = (tamanioArray && tamanioArray.length === 0) ? undefined : tamanioArray;
    const valoraciones_empresas = (valoraciones_empresasArray && valoraciones_empresasArray.length === 0) ? undefined : valoraciones_empresasArray;
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const valoracionesRangos = valoraciones_empresas
        ? valoraciones_empresas.map(valoracion => ({
          gte: valoracion - 0.5,
          lte: valoracion
        }))
        : [];
      const where: any = {
        AND: [
          empresa ? {
            empresa: {
              contains: empresa,
            },
          } : undefined,
          tamanio != undefined ? {
            OR: tamanio.map(tamanio => ({
              tamanio: {
                gte: tamanio.desde,
                lte: tamanio.hasta
              }
            }))
          } : undefined
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.empresas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ubicacion: {
            contains: ubicacion
          },
          ...(sectores != undefined
            ? {
              sectores: {
                sector: {
                  in: sectores
                }
              }
            } : {}),
          ...(palabras_claves != undefined
            ? {
              ofertas: {
                some: {
                  palabras_clave_oferta: {
                    some: {
                      palabras_claves: {
                        palabra: {
                          in: palabras_claves
                        }
                      }
                    }
                  }
                }
              }
            } : {}),
          ...where
        },
        orderBy,
        include: {
          sectores: {
            select: {
              id: true,
              sector: true
            }
          },
          ofertas: {
            select: {
              palabras_clave_oferta: {
                select: {
                  palabras_claves: true
                }
              },
              postulaciones: true,
              postulaciones_guardadas: true,
              empresas: {
                select: {
                  empresa_seguida: true
                }
              }
            }
          },
          _count: {
            select: {
              empresa_seguida: true,
              ofertas: true,
              valoraciones_empresas: true,
            },
          },
          valoraciones_empresas: true,
          empresa_seguida: true
        },
      });

      const resultPromedio = result.map(empresas => {
        const valoraciones = empresas.valoraciones_empresas.map(v => new Decimal(v.valoracion));
        let promedioValoraciones = null;
        if (valoraciones.length > 0) {
          const sum = valoraciones.reduce((acumulador, valor) => acumulador.plus(valor), new Decimal(0));
          promedioValoraciones = sum.div(valoraciones.length).toNumber();
        }

        const inscritoOfertaByToken = empresas.ofertas.some(v => v.postulaciones.some(p => p.usuario_id === userId))
        const ofertaGuardadaByToken = empresas.ofertas.some(v => v.postulaciones_guardadas.some(p => p.usuario_id === userId))
        const empresaSeguidaByToken = empresas.empresa_seguida.some(v => v.usuario_id === userId)

        return {
          ...empresas,
          inscritoOfertaByToken,
          ofertaGuardadaByToken,
          empresaSeguidaByToken,
          promedioValoraciones
        };
      }).filter(empresas => {
        if (valoracionesRangos.length > 0) {
          return valoracionesRangos.some(rango => {
            return empresas.promedioValoraciones >= rango.gte && empresas.promedioValoraciones <= rango.lte;
          });
        }

        return true;
      });

      const total = await this.prisma.empresas.count({
        where: {

          ubicacion: {
            contains: ubicacion
          },
          ...(sectores != undefined
            ? {
              sectores: {
                sector: {
                  in: sectores
                }
              }
            } : {}),
          ...(palabras_claves != undefined
            ? {
              ofertas: {
                some: {
                  palabras_clave_oferta: {
                    some: {
                      palabras_claves: {
                        palabra: {
                          in: palabras_claves
                        }
                      }
                    }
                  }
                }
              }
            } : {}),
          ...where
        },

      })

      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        total: valoraciones_empresas !== undefined ||
          tamanio !== undefined ||
          sectores !== undefined ||
          palabras_claves !== undefined

          ? resultPromedio.length : total,
        ...paginateEmpresa,
        ...filtros,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', resultPromedio, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllEmpresaByUserToken(paginateEmpresa: PaginationEmpresaDto, request: Request) {

    const { limit = 10, page = 1, empresa, sortColumn = "id", sortOrder = "asc" } = paginateEmpresa;
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const where: any = {
        AND: [
          empresa ? {
            empresa: {
              contains: empresa,
              //mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const empresas = await this.prisma.empresas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: userId,
          ...where
        },
        orderBy,
        include: {
          empresa_seguida: {
            where: {
              usuario_id: userId
            }
          },
          sectores: {
            select: {
              id: true,
              sector: true
            }
          },

          _count: {
            select: {
              empresa_seguida: true,
              ofertas: true,
              valoraciones_empresas: true,
            }
          },

        }
      });
      const total = await this.prisma.empresas.count({
        where: {
          usuario_id: userId,
          ...where
        },
      })

      if (empresas.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        empresa: empresa,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', empresas, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllValoraciones(id: number) {
    try {
      const empresa = await this.prisma.empresas.findFirst({
        where: {
          id: id,
        },
        include: {
          valoraciones_empresas: true
        },
      });


      if (!empresa) {
        return formatResponseMessages(true, 'No se encontraron valoraciones para esta empresa', []);
      }

      return formatResponseMessages(true, "Operacion Exitosa", [empresa])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllValoracionesDetails(id: number) {
    try {
      const empresa = await this.prisma.empresas.findFirst({
        where: {
          id: id,
        },
        select: {
          id: true,
          empresa: true,
          valoraciones_empresas: {
            select: {
              id: true,
              valoracion: true,
              observacion: true,
              createdAt: true,
              usuarios: {
                select: {
                  imagen: true,
                  cargo: true,
                  personas: {
                    select: {
                      apellido_materno: true,
                      apellido_paterno: true,
                      nombre: true,
                    }

                  }
                },
              },
            }
          }
        },
      });

      if (empresa && empresa.valoraciones_empresas) {
        empresa.valoraciones_empresas = empresa.valoraciones_empresas.map((valoracion) => ({
          ...valoracion,
          usuario: valoracion.usuarios
        }));
      }

      if (!empresa) {
        return formatResponseMessages(false, 'No se encontraron valoraciones para esta empresa', []);
      }

      return formatResponseObjectMessages(true, "Operacion Exitosa", empresa)
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const empresa = await this.prisma.empresas.findFirst({
        where: {
          id: id,
        },
        include: {
          ofertas: {
            select: {
              postulaciones: true,
              postulaciones_guardadas: true,
            }
          },
          sectores: {
            select: {
              id: true,
              sector: true
            }
          },
          usuarios: {
            select: {
              link_valoracion: true
            }
          },
          empresa_seguida: true,
          valoraciones_empresas: true,
          _count: {
            select: {
              empresa_seguida: true,
              ofertas: true,
              valoraciones_empresas: true,

            }
          }
        },
      });

      const empresaSeguidaByToken = empresa.empresa_seguida.some(v => v.usuario_id === userId)
      const ofertaGuardadaByToken = empresa.ofertas.some(v => v.postulaciones.some(v => v.usuario_id === userId))
      const inscritoOfertaByToken = empresa.ofertas.some(v => v.postulaciones_guardadas.some(v => v.usuario_id === userId))

      if (!empresa) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró el registro ${id}`, []));
      }

      const resultado = {
        empresa,
        empresaSeguidaByToken,
        ofertaGuardadaByToken,
        inscritoOfertaByToken
      };

      return formatResponseMessages(true, "Operacion Exitosa", [resultado])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.empresas.update({
          where: { id },
          data: { usuario_id: userId, ...updateEmpresaDto }
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
          descripcion: `Actualizamos una ${name}`,
          accion: 2,
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.empresas.delete({
          where: { id, usuario_id: userId },
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(""),
          jsonsalida: JSON.stringify(result),
          descripcion: `Eliminamos una ${name}`,
          accion: 3,
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      } else {
        throw new NotFoundException(formatResponseMessages(false, `"No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findById(id: number) {
    try {
      const busqueda = await this.prisma.empresas.findFirst({
        where: {
          id: id
        }
      })
      return busqueda !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async loginEmpresas(login: LoginDto, request: Request) {

    const { usuario, contrasena } = login
    try {

      const user = await this.prisma.usuarios.findFirst({
        where: {
          email: usuario,
          OR: [
            { tipo_usuario_id: 1 },
            { tipo_usuario_id: 3 },
          ]
        },
        include: {
          empresas: {
            take: 1
          },
          personas: true
        }
      }) as {
        id: number;
        email: string;
        contrasena: string;
        tipo_usuario_id: number;
        empresa?: any;  // Solo una empresa después de la transformación
        empresas?: any[];  // Prisma devuelve esto originalmente
      } | null;

      if (!user) {
        throw new UnauthorizedException("credenciales no validas")
      }

      if (!bcrypt.compareSync(contrasena, user.contrasena)) {
        throw new UnauthorizedException("credenciales no son validas")
      }

      const empresasRelacionadas = await this.prisma.empresas.findMany({
        where: { usuario_id: user.id }
      });

      if (empresasRelacionadas.length === 0) {
        console.log("no autpriado ..")
        throw new UnauthorizedException("El usuario no tiene relación con ninguna empresa");
      }

      if (user && user.empresas.length > 0) {
        user.empresa = user.empresas[0];
        delete user.empresas;
      }

      const { contrasena: _, ...rest } = user
      const userJson = JSON.parse(JSON.stringify(rest))
      const tokenGenerado = this.usuarioService.getJwtToken({ id: userJson.id })

      const updateToken = await this.prisma.usuarios.update({
        where: { id: user.id },
        data: {
          token: tokenGenerado
        }
      })
      return formatResponseMessages(true, 'Operacion Exitosa', [{
        user: userJson,
        token: tokenGenerado
      }]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findAllSameSector(idEmpresa: number, paginate: PaginationEmpresaDto) {
    const { limit = 10, page = 1, empresa, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {

      const searchEmpresa = await this.prisma.empresas.findFirst({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          id: idEmpresa
        }
      })
      if (!searchEmpresa) {
        return formatResponseMessages(true, 'La empresa no existe');
      }
      const where: any = {
        AND: [
          empresa ? {
            empresa: {
              contains: empresa,
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.empresas.findMany({
        where: {
          sector_id: searchEmpresa.sector_id,
          ...where
        },
        select: {
          id: true,
          empresa: true,
          valoraciones_empresas: {
            select: {
              valoracion: true
            }
          },
        }
      })

      const promedio = result.map(empresa => {
        const valoraciones = empresa.valoraciones_empresas.map(v => new Decimal(v.valoracion));

        let promedioValoraciones = null
        if (valoraciones.length > 0) {
          const sumatoria = valoraciones.reduce((acumulador, inicial) => acumulador.plus(inicial), new Decimal(0))
          promedioValoraciones = sumatoria.div(valoraciones.length).toNumber();
        }
        return {
          ...empresa,
          promedioValoraciones
        }
      }).sort((a, b) => b.promedioValoraciones - a.promedioValoraciones)
      return promedio

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findAllBySector(idEmpresa: number, paginate: PaginationEmpresaDto) {
    const { limit = 10, page = 1, empresa, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {
      const searchEmpresa = await this.prisma.empresas.findFirst({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          id: idEmpresa
        }
      })
      if (!searchEmpresa) {
        return formatResponseMessages(true, 'La empresa no existe');
      }
      const where: any = {
        AND: [
          empresa ? {
            empresa: {
              contains: empresa,
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.empresas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          sector_id: searchEmpresa.sector_id,
          ...where
        },
        select: {
          id: true,
          empresa: true,
          _count: {
            select: {
              ofertas: {
                where: {
                  finalizada: false,
                  borrador: false
                }
              }
            }
          }
        }
      })
      return result
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAlllastInscritosEmpresaByToken(paginate: PaginationEmpresaOfertaNombreDto, request: Request) {
    const { limit = 10, page = 1  , sortColumn = "id", sortOrder = "asc" , cargo , nombre} = paginate
    const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
    

    const fieldMap= {
      cargo:"ofertas",
      nombre:"personas"
    }
    try {

      const busqueda  = await this.prisma.empresas.findFirst({
        where:{
          usuario_id:userId
        }
      })
      if(!busqueda){
        return formatResponseMessages(true, 'El usuario no tiene empresas asociadas');

      }
      const relationToOrderBy = fieldMap[sortColumn];
      const orderBy: { [key: string]: string } = {
        [sortColumn]: sortOrder,
      };

      const result = await this.prisma.postulaciones.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ofertas: {
            empresas: {
              id: busqueda.id
            }
          }
        },
        orderBy: {
          ...(relationToOrderBy === 'ofertas' ? { ofertas: orderBy } : {}),
          ...(relationToOrderBy === 'personas' ? { usuarios: { personas: orderBy } } : {}),
        }, 
        include:{
          ofertas:{
            select:{
              cargo:true
            }
          },
          usuarios:{
            select:{
              personas:{
                select:{
                  nombre:true , 
                  apellido_materno:true , 
                  apellido_paterno:true
                }
              }
            }
          }
        }
      })
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result   , null , meta);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
