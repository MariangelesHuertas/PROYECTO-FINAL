import { BadRequestException, Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, formatResponseObjectMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationOfertasDto } from './dto/pagination-ofertas.dto';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
import { PalabrasClaveOfertaService } from '../palabras_clave_oferta/palabras_clave_oferta.service';
import { CreatePalabrasClaveOfertaDto, PalabraClaveArray } from '../palabras_clave_oferta/dto/create-palabras_clave_oferta.dto';
import { AptitudesOfertaService } from '../aptitudes_oferta/aptitudes_oferta.service';
import { AptitudesArray, CreateAptitudesOfertaDto } from '../aptitudes_oferta/dto/create-aptitudes_oferta.dto';
import { FilterOfertas } from './dto/filter-oferta.dto';
import Decimal from 'decimal.js';
import { RecomendacionesService } from '../recomendaciones/recomendaciones.service';
const name = "- Ofertas -"
@Injectable()
export class OfertasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
    private readonly palabrasClaveOfertaService: PalabrasClaveOfertaService,
    private readonly aptitudesOfertaService: AptitudesOfertaService,
    private readonly recomendacionesService: RecomendacionesService , private readonly httpService: HttpService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(OfertasService.name)
  }
  async create(createOfertaDto: CreateOfertaDto, request: Request) {

    const { palabras_clave_ofertas, aptitudes_ofertas, ...rest } = createOfertaDto

    try {
      const empresaId = (await this.findEmpresa(request)).data?.[0].id
      const result = await this.prisma.ofertas.create({
        data: {
          empresa_id: empresaId,
          ...rest
        }
      })

      const palabrasClaveArray: PalabraClaveArray[] = [];
      palabras_clave_ofertas.map(palabra => {
        palabrasClaveArray.push(palabra);
      });

      const palabras: CreatePalabrasClaveOfertaDto = {
        oferta_id: result.id,
        palabras_claves: palabras_clave_ofertas
      }

      const aptitudesArray: AptitudesArray[] = [];
      aptitudesArray.map(aptitudes => {
        aptitudesArray.push(aptitudes);
      });

      const aptitudes: CreateAptitudesOfertaDto = {
        oferta_id: result.id,
        aptitudes_array: aptitudes_ofertas
      }

      const createPalabras = await this.palabrasClaveOfertaService.createOrUpdatePalabraOferta(palabras, request)
      const createAptitudes = await this.aptitudesOfertaService.createOrUpdateAptitudeOferta(aptitudes, request)

      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
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

      return formatResponseObjectMessages(true, "Operacion Exitosa", { ...result, createAptitudes, createPalabras })
    } catch (error) {
      console.log("erro: --------");
      console.log(error);

      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findEmpresa(request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: +userId
        }
      })
      if (result === null) {
        return formatResponseMessages(true, "No hay empresas para este usuario", [])
      }
      return formatResponseMessages(true, "Operacion Exitosa", [result])

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllRecomendacionesByUser(paginationOferta: PaginationOfertasDto, filter: FilterOfertas, request?: Request) {
    const { limit = 10, page = 1, cargo, sector, ubi_poblacion, ubi_provincia, sortColumn = "createdAt", sortOrder = "desc" } = paginationOferta
    const { valoraciones_empresasArray } = filter
    const valoraciones_empresas = (valoraciones_empresasArray && valoraciones_empresasArray.length === 0) ? undefined : valoraciones_empresasArray;
    const valoracionesRangos = valoraciones_empresas
      ? valoraciones_empresas.map(valoracion => ({
        gte: valoracion - 0.5,
        lte: valoracion
      }))
      : [];

    const palabrasExcluidas = ["el", "la", "los", "las", "de", "del", "y", "o", "a", "un", "una", "por", "para", "con", "sin", "sobre", "entre"];
    let arrayEmpresasId = []
    let arrayCargo = []

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const busquedaExperienciasUsuarios = await this.recomendacionesService.countExperiencias(userId)

      if (busquedaExperienciasUsuarios) {
        const [empresasId, cargos] = await this.recomendacionesService.findAllRecomendationsOfertas(request)
        arrayEmpresasId = empresasId
        arrayCargo = cargos
        console.log("entro y si tiene experciencas", busquedaExperienciasUsuarios)
      }

      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {

            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,
          sector ? {
            sectores: {
              sector: {
                contains: sector,
              },
            },
          } : undefined,

        ].filter(Boolean),
      };

      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.ofertas.findMany({
        /*  skip: (page - 1) * limit,
         take: limit, */
        where: {
          ...(arrayEmpresasId.length > 0 && {
            empresa_id: {
              in: arrayEmpresasId,
            },
          }),
          ...where,

        },
        orderBy,
        include: {
          empresas: {
            include: {
              valoraciones_empresas: true,
              _count: {
                select: {
                  valoraciones_empresas: true,
                  ofertas: true,
                  empresa_seguida: true,
                }
              },
              usuarios: true,
              empresa_seguida: true,
              ofertas: true,

            },
          },
          aptitudes_oferta: {
            include: {
              aptitudes: true
            }
          },
          sectores: true,
          postulaciones_guardadas: true,
          postulaciones: true,
          _count: {
            select: {
              postulaciones: true
            }
          }

        }
      });

      //console.log(result  , "resultados")
      const resultPromedio = result.map(ofertas => {
        const valoraciones = ofertas.empresas.valoraciones_empresas.map(v => new Decimal(v.valoracion));
        let promedioValoraciones = null;

        if (valoraciones.length > 0) {
          const sum = valoraciones.reduce((acumulador, valor) => acumulador.plus(valor), new Decimal(0));
          promedioValoraciones = sum.div(valoraciones.length).toNumber();
        }

        const ofertaGuardadaByUser = ofertas.postulaciones_guardadas.some(v => v.usuario_id === userId);
        const inscritoOfertaByUser = ofertas.postulaciones.some(v => v.usuario_id === userId);
        const sigueEmpresaByUser = ofertas.empresas.empresa_seguida.some(v => v.usuario_id === userId);

        const cargoPalabras = ofertas.cargo.split(' ')
          .map(palabra => palabra.toLowerCase())
          .filter(palabra => !palabrasExcluidas.includes(palabra));

        const tienePalabrasRelevantes = cargoPalabras.some(palabra => arrayCargo.includes(palabra));

        return {
          ...ofertas,
          ofertaGuardadaByUser,
          inscritoOfertaByUser,
          sigueEmpresaByUser,
          promedioValoraciones,
          tienePalabrasRelevantes
        };
      });

      const filteredResult = resultPromedio.filter(empresas => {
        if (valoracionesRangos.length > 0) {
          return valoracionesRangos.some(rango => {
            return empresas.promedioValoraciones >= rango.gte && empresas.promedioValoraciones <= rango.lte;
          });
        }
        return true;
      });

      const finalResult = filteredResult.filter(empresas => empresas.tienePalabrasRelevantes);

      const final = finalResult.length > 0 ? finalResult : filteredResult;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginateSlice = final.slice(startIndex, endIndex);

      if (result.length === 0) {
        return formatResponseMessages(false, 'No se encontraron Ofertas', []);
      }

      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total: final.length,
        sector,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', paginateSlice, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(paginationOferta: PaginationOfertasDto, filter: FilterOfertas, request?: Request) {
    const { limit = 10, page = 1, cargo, sector, ubi_poblacion, ubi_provincia, sortColumn = "createdAt", sortOrder = "desc" } = paginationOferta
    const { valoraciones_empresasArray } = filter
    const valoraciones_empresas = (valoraciones_empresasArray && valoraciones_empresasArray.length === 0) ? undefined : valoraciones_empresasArray;
    const valoracionesRangos = valoraciones_empresas
      ? valoraciones_empresas.map(valoracion => ({
        gte: valoracion - 0.5,
        lte: valoracion
      }))
      : [];

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {

            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,
          sector ? {
            sectores: {
              sector: {
                contains: sector,
              },
            },
          } : undefined,

        ].filter(Boolean),
      };

      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.ofertas.findMany({
        /*  skip: (page - 1) * limit,
         take: limit, */
        where: {
          ...where,
        },
        orderBy,
        include: {
          empresas: {
            include: {
              valoraciones_empresas: true,
              _count: {
                select: {
                  valoraciones_empresas: true,
                  ofertas: true,
                  empresa_seguida: true,
                }
              },
              usuarios: true,
              empresa_seguida: true,
              ofertas: true,

            },
          },
          aptitudes_oferta: {
            include: {
              aptitudes: true
            }
          },
          sectores: true,
          postulaciones_guardadas: true,
          postulaciones: true,
          _count: {
            select: {
              postulaciones: true
            }
          }

        }
      });
      //console.log(result  , "resultados")
      const resultPromedio = result.map(ofertas => {
        const valoraciones = ofertas.empresas.valoraciones_empresas.map(v => new Decimal(v.valoracion));
        let promedioValoraciones = null;

        if (valoraciones.length > 0) {
          const sum = valoraciones.reduce((acumulador, valor) => acumulador.plus(valor), new Decimal(0));
          promedioValoraciones = sum.div(valoraciones.length).toNumber();
        }
        const ofertaGuardadaByUser = ofertas.postulaciones_guardadas.some(v => v.usuario_id === userId)
        const inscritoOfertaByUser = ofertas.postulaciones.some(v => v.usuario_id === userId)
        const sigueEmpresaByUser = ofertas.empresas.empresa_seguida.some(v => v.usuario_id === userId)
        return {
          ...ofertas,
          ofertaGuardadaByUser,
          inscritoOfertaByUser,
          sigueEmpresaByUser,
          promedioValoraciones,
        };
      }).filter(empresas => {

        if (valoracionesRangos.length > 0) {
          return valoracionesRangos.some(rango => {
            return empresas.promedioValoraciones >= rango.gte && empresas.promedioValoraciones <= rango.lte;
          });
        }
        return true;
      })
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginateSlice = resultPromedio.slice(startIndex, endIndex);

      if (result.length === 0) {
        return formatResponseMessages(false, 'No se encontraron Ofertas', []);
      }

      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total: resultPromedio.length,
        sector,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', paginateSlice, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  

  async findOne(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      let oferta: any = await this.prisma.ofertas.findFirst({
        where: {
          id: id
        },
        include: {
          empresas: true,
          _count: {
            select: {
              postulaciones: true
            }
          }
        }
      })

      if (!oferta) {
        throw new NotFoundException(formatResponseMessages(false, "No se encontro el registro Oferta", []))
      } else {
        oferta.guardada = false;
        if (userId !== 0) {
          // Verificar si la oferta seleccionada esta guarda
          const guardada = await this.prisma.postulaciones_guardadas.findFirst({
            where: {
              oferta_id: id,
              usuario_id: userId
            }
          });

          if (guardada) oferta.guardada = true;
        }
      }

      return formatResponseMessages(true, "Operacion Exitosa", oferta)
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateOfertaDto: UpdateOfertaDto, request: Request) {
    try {
      const busqueda = await this.findByIdOfertas(id)

      if (busqueda) {
        const result = await this.prisma.ofertas.update({
          where: { id },
          data: { ...updateOfertaDto }
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(busqueda),
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
        throw new NotFoundException(formatResponseMessages(false, "No se encontro el registro Oferta", []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request: Request) {
    try {

      const busqueda = await this.findByIdOfertas(id);
      if (busqueda) {
        const result = await this.prisma.ofertas.delete({
          where: { id },
        });
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
        throw new NotFoundException(formatResponseMessages(false, "No se encontró el registro Oferta", []));
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByIdOfertas(id: number) {
    try {
      const oferta = await this.prisma.ofertas.findFirst({
        where: { id },
      });
      return oferta !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


  async getAllByEmpresaId(empresaId: number, paginationOferta: PaginationOfertasDto) {
    const { limit = 10, page = 1, cargo, ubi_poblacion, valoracion = undefined, ubi_provincia, sortColumn = "id", sortOrder = "asc" } = paginationOferta
    try {

      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {
            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,

        ].filter(Boolean),

      };
      const orderBy: { [key: string]: string } = {
        [sortColumn]: sortOrder,
      };
      const ofertas = await this.prisma.ofertas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        where: {
          finalizada: false,
          borrador: false,
          empresa_id: empresaId,
          ...where,
          ...(valoracion != undefined ? {
            empresas: {
              valoraciones_empresas: {
                some: {
                  valoracion: valoracion
                }
              }
            }
          } : {}),

        },

        include: {
          empresas: {

            select: {
              _count: {
                select: {
                  empresa_seguida: true,
                  valoraciones_empresas: true
                }
              },

              valoraciones_empresas: true
            },

          },
          _count: {
            select: {
              postulaciones: true
            }
          }
        }
      });

      const total = await this.prisma.ofertas.count({
        where: {
          finalizada: false,
          borrador: false,
          empresa_id: empresaId,
          ...where,
          ...(valoracion != undefined ? {
            empresas: {
              valoraciones_empresas: {
                some: {
                  valoracion: valoracion
                }
              }
            }
          } : {}),

        },
      })
      if (ofertas.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }
      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', ofertas, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async getAllByEmpresaByToken(paginationOferta: PaginationOfertasDto, request: Request) {
    const { limit = 10, page = 1, cargo, ubi_poblacion, valoracion = undefined, ubi_provincia, sortColumn = "id", sortOrder = "asc" } = paginationOferta
    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const empresaBuscada = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: userId
        }
      })
      if (!empresaBuscada) {
        return formatResponseMessages(true, 'No se encontro una empresa relacionada a este usuario', []);
      }

      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {
            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,

        ].filter(Boolean),

      };
      const orderBy: { [key: string]: string } = {
        [sortColumn]: sortOrder,
      };
      const ofertas = await this.prisma.ofertas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        where: {
          finalizada: false,
          borrador: false,
          empresa_id: empresaBuscada.id,
          ...where,
          ...(valoracion != undefined ? {
            empresas: {
              valoraciones_empresas: {
                some: {
                  valoracion: valoracion
                }
              }
            }
          } : {}),

        },

        include: {
          empresas: {

            select: {
              _count: {
                select: {
                  empresa_seguida: true,
                  valoraciones_empresas: true,
                }
              },
              valoraciones_empresas: true,
            }
          },
          _count: {
            select: {
              postulaciones: true
            }
          }

        }
      });

      const total = await this.prisma.ofertas.count({
        where: {
          finalizada: false,
          borrador: false,
          empresa_id: empresaBuscada.id,
          ...where,
          ...(valoracion != undefined ? {
            empresas: {
              valoraciones_empresas: {
                some: {
                  valoracion: valoracion
                }
              }
            }
          } : {}),

        },
      })
      if (ofertas.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }
      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', ofertas, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


  async changeFieldBorrador(id: number) {

    try {

      const oferta = await this.prisma.ofertas.findUnique({
        where: { id },
        select: { borrador: true }
      });
      const result = await this.prisma.ofertas.update({
        where: {
          id
        },
        data: {
          borrador: !oferta?.borrador
        }
      })
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async changeFieldFinalizado(id: number) {
    try {
      const result = await this.prisma.ofertas.update({
        where: {
          id
        },
        data: {
          finalizada: true,
          dateFinalizada: new Date()
        }
      })
      if (result.finalizada == true) {
        await this.prisma.ofertas.update({
          where: {
            id
          },
          data: {
            borrador: false
          }
        })
      }
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }



  async findAllStateBorradorToken(paginationOferta: PaginationOfertasDto, request: Request) {
    const { limit = 10, page = 1, cargo, sector, ubi_poblacion, ubi_provincia, sortColumn = "id", sortOrder = "asc" } = paginationOferta
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busquedaEmpresa = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: userId
        }
      })
      if (!busquedaEmpresa) {
        return formatResponseMessages(true, 'No se encontro una empresa relacionada a este usuario', []);
      }
      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {
            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,

        ].filter(Boolean),

      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.ofertas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          borrador: true,
          finalizada: false,
          empresa_id: busquedaEmpresa.id,
          sectores: {
            sector: {
              contains: sector
            }
          },
          ...where
        },
        orderBy,
        include: {
          _count: {
            select: {
              postulaciones: true
            }
          }
        }
      });
      const total = await this.prisma.ofertas.count({
        where: {
          borrador: true,
          empresa_id: busquedaEmpresa.id,
          sectores: {
            sector: {
              contains: sector
            }
          },
          ...where
        },
      })
      if (result.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }
      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total, sector, ubi_poblacion, ubi_provincia,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllStateFinalizadoToken(paginationOferta: PaginationOfertasDto, request: Request) {
    const { limit = 10, page = 1, cargo, sector, ubi_poblacion, ubi_provincia, sortColumn = "id", sortOrder = "asc" } = paginationOferta
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busquedaEmpresa = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: userId
        }
      })
      if (!busquedaEmpresa) {
        return formatResponseMessages(true, 'No se encontro una empresa relacionada a este usuario', []);
      }
      const where: any = {
        AND: [
          cargo ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          ubi_poblacion ? {
            ubi_poblacion: {
              contains: ubi_poblacion,
            },
          } : undefined,
          ubi_provincia ? {
            ubi_provincia: {
              contains: ubi_provincia,
            },
          } : undefined,

        ].filter(Boolean),

      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;

      const result = await this.prisma.ofertas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          borrador: false,
          finalizada: true,
          empresa_id: busquedaEmpresa.id,
          sectores: {
            sector: {
              contains: sector
            }
          },
          ...where
        },
        orderBy,
        include: {
          _count: {
            select: {
              postulaciones: true,
            },
          },
        }
      });



      // Agregar el count de postulaciones finalistas
      const ofertasConFinalistas = await Promise.all(
        result.map(async (oferta) => {
          // Realiza una transacción para obtener los datos agregados de una sola vez
          const [totalPostulaciones, minMaxDates, postulacionesCondicionales] = await this.prisma.$transaction([
            this.prisma.postulaciones.count({
              where: {
                oferta_id: oferta.id,
              },
            }),
            this.prisma.postulaciones.aggregate({
              where: {
                oferta_id: oferta.id,
              },
              _min: {
                createdAt: true,
              },
              _max: {
                createdAt: true,
              },
            }),
            this.prisma.postulaciones.count({
              where: {
                oferta_id: oferta.id,
                fases_postulaciones: {
                  seleccionado: true
                }
              },
            })
          ]);

          // Calcular el promedio de datos por día
          const { _min, _max } = minMaxDates;
          let promedioDatosPorDia = 0;

          if (_min.createdAt && _max.createdAt) {
            const totalDias =
              (new Date(_max.createdAt).getTime() - new Date(_min.createdAt).getTime()) /
              (1000 * 60 * 60 * 24); // Diferencia en días

            promedioDatosPorDia = totalPostulaciones / (totalDias || 1); // Evita división por 0
          }

          return {
            ...oferta,
            countFinalistas: postulacionesCondicionales,
            promedioDatosPorDia,
          };
        })
      );

      const total = await this.prisma.ofertas.count({
        where: {
          borrador: true,
          empresa_id: busquedaEmpresa.id,
          sectores: {
            sector: {
              contains: sector
            }
          },
          ...where
        },
      })
      if (ofertasConFinalistas.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }
      const meta = {
        limit: limit,
        page: page,
        cargo: cargo,
        total, sector, ubi_poblacion, ubi_provincia,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', ofertasConFinalistas, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

}

/* const resultPromedio = result.map(ofertas => {
        const valoraciones = ofertas.empresas.valoraciones_empresas.map(v => new Decimal(v.valoracion));
        let promedioValoraciones = null;

        if (valoraciones.length > 0) {
          const sum = valoraciones.reduce((acumulador, valor) => acumulador.plus(valor), new Decimal(0));
          promedioValoraciones = sum.div(valoraciones.length).toNumber();
        }

        const ofertaGuardadaByUser = ofertas.postulaciones_guardadas.some(v => v.usuario_id === userId)
        const inscritoOfertaByUser = ofertas.postulaciones.some(v => v.usuario_id === userId)
        const sigueEmpresaByUser = ofertas.empresas.empresa_seguida.some(v => v.usuario_id === userId)

        const cargoPalabras = ofertas.cargo.split(' ')
          .map(palabra => {
            return palabra.toLowerCase()
          })
          .filter(palabra => {

            return !palabrasExcluidas.includes(palabra)
          });

        const tienePalabrasRelevantes = cargoPalabras.some(palabra => {
          return arrayCargo.includes(palabra);
        });

        return {
          ...ofertas,
          ofertaGuardadaByUser,
          inscritoOfertaByUser,
          sigueEmpresaByUser,
          promedioValoraciones,
          tienePalabrasRelevantes
        };
      }).filter(empresas => {

        if (valoracionesRangos.length > 0) {
          return valoracionesRangos.some(rango => {
            return empresas.promedioValoraciones >= rango.gte && empresas.promedioValoraciones <= rango.lte;
          });
        }

        return true;
      }).filter(empresas => empresas.tienePalabrasRelevantes); */






















