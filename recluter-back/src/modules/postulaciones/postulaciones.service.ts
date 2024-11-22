import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { PaginationPostulacionDto } from './dto/paginate-postulaciones.dto';
import Decimal from 'decimal.js';
import { FilterOferta } from './dto/filter-postulaciones.dto';
import { UpdateFasePosutlacionDto } from './dto/update-fase-postulacion.dto';

const name = "- Postulaciones -"
@Injectable()
export class PostulacionesService implements OnModuleInit {

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PostulacionesService.name)
  }
  async createOrDelete(createPostulacioneDto: CreatePostulacioneDto, request: Request) {
    const { oferta_id } = createPostulacioneDto
    try {

      const fase_postulacion = await this.prisma.fases_postulaciones.findFirst({
        orderBy: {
          prioridad: "asc"
        }
      })
      let createDelete
      let accion = 1
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (await this.busquedaUsuario(userId) && await this.busquedaOferta(oferta_id)) {

        const busqueda = await this.prisma.postulaciones.findFirst({
          where: {
            oferta_id,
            usuario_id: userId
          }
        })
        if (busqueda) {
          createDelete = await this.prisma.postulaciones.delete({
            where: {
              usuario_id_oferta_id: {
                oferta_id,
                usuario_id: userId
              }
            }
          })
          accion = 3
        } else {
          createDelete = await this.prisma.postulaciones.create({
            data: {
              usuario_id: userId,
              ...createPostulacioneDto,
              fase_postulacion_id: fase_postulacion.id
            }
          })
          accion = 1
        }

        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(`${accion == 1 ? createDelete : ""}`),
          jsonsalida: JSON.stringify(`${accion == 3 ? createDelete : ""}`),
          descripcion: `se ${accion == 1 ? 'creo' : 'elimino'} una Postulacion`,
          accion: 1,
          ruta: request.url,
          log: "",
          tabla: "postulacion",
          pk_actualizado: createDelete.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, "Operacion Exitosa", [createDelete])

      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }

    } catch (error) {
      console.log("error: --");
      console.log(error);
      
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaUsuario(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.usuarios.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaOferta(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.ofertas.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async remove(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.postulaciones_guardadas.delete({
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
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error)
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message))
    }
  }
  async findById(id: number) {
    try {
      const busqueda = await this.prisma.postulaciones_guardadas.findFirst({
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
  async getAllByUser(paginate: PaginationPostulacionDto, request: Request) {
    const { limit = 10, sector, page = 1 } = paginate
    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.postulaciones.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: userId,
          ofertas: {
            sectores: {
              sector: {
                contains: sector
              }
            },
          }
        },
        include: {
          ofertas: {
            include: {
              sectores: true
            }
          }
        }
      });
      const total = await this.prisma.postulaciones.count({
        where: {
          usuario_id: userId,
          ofertas: {
            sectores: {
              sector
            }
          }
        },
      })
      if (result.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Postulaciones', []);
      }
      const meta = {
        limit: limit,
        page: page,
        sector,
        total
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllPostulacionesByOferta(idOferta: number, paginate: PaginationPostulacionDto, filter: FilterOferta) {
    const { limit = 10, apellido_materno, apellido_paterno, cargo, meses_experiencia, nombre, tipo_usuario, sortColumn, sortOrder, ubicacion, usuario, sector, page = 1 } = paginate

    const { anios_experienciaArray, valoraciones_empresasArray, tipo_educacionArray } = filter

    const anios_experiencia = (anios_experienciaArray && anios_experienciaArray.length === 0) ? undefined : anios_experienciaArray
    const valoraciones_empresas = (valoraciones_empresasArray && valoraciones_empresasArray.length === 0) ? undefined : valoraciones_empresasArray;
    const tipos_educacion = (tipo_educacionArray && tipo_educacionArray.length === 0) ? undefined : tipo_educacionArray;

    try {

      const fieldMap = {
        usuario: 'usuarios',
        ubicacion: 'usuarios',
        cargo: 'usuarios',
        meses_experiencia: 'usuarios',
        createdAt: 'usuarios',
        apellido_materno: 'personas',
        apellido_paterno: 'personas',
        nombre: 'personas',
        tipo_usuario: 'tipos_usuarios',
        sector: 'sectores',
      };

      const wherePersonas: any = {
        AND: [
          nombre
            ? {
              nombre: {
                contains: nombre,
              },
            }
            : undefined,
          apellido_materno
            ? {
              apellido_materno: {
                contains: apellido_materno,
              },
            }
            : undefined,
          apellido_paterno
            ? {
              apellido_paterno: {
                contains: apellido_paterno,
              },
            }
            : undefined,
        ].filter(Boolean),

      };
      const whereUsuarios: any = {
        AND: [
          usuario
            ? {
              usuario: {
                contains: usuario,
              },
            }
            : undefined,
          ubicacion
            ? {
              ubicacion: {
                contains: ubicacion,
              },
            }
            : undefined,
          meses_experiencia
            ? {
              meses_experiencia: {
                equals: meses_experiencia,
              },
            }
            : undefined,
          cargo
            ? {
              cargo: {
                contains: cargo,
              },
            }
            : undefined,
        ].filter(Boolean),
        ...(tipos_educacion ? {
          educacion_usuarios: {
            some: {
              centros_educativos: {
                educacion_usuarios: {
                  some: {
                    tipos_educacion: {
                      tipo_educacion: {
                        in: tipos_educacion
                      }
                    }
                  }
                }
              }
            }
          }
        } : {}),
      };
      const relationToOrderBy = fieldMap[sortColumn];
      const orderBy: { [key: string]: string } = {
        [sortColumn]: sortOrder,
      };

      const result = await this.prisma.postulaciones.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          ...(relationToOrderBy === 'usuarios' ? { usuarios: orderBy } : {}),
          ...(relationToOrderBy === 'personas' ? { usuarios: { personas: orderBy } } : {}),
          ...(relationToOrderBy === 'tipos_usuarios' ? { usuarios: { tipos_usuarios: orderBy } } : {}),
          ...(relationToOrderBy === 'sectores' ? { ofertas: { sectores: orderBy } } : {}),
        },
        where: {
          ofertas: {
            id: idOferta
          },
          usuarios: {
            ...(tipo_usuario ? {
              tipos_usuarios: {
                tipo_usuario: {
                  contains: tipo_usuario,
                },
              },
            } : {}),
            ...whereUsuarios,
            personas: {
              ...wherePersonas,
            },
          },
          ...(sector ? {
            ofertas: {
              sectores: {
                sector
              }
            }
          } : {}),
        },
        select: {
          usuarios: {
            select: {
              id: true,
              usuario: true,
              imagen: true,
              ubicacion: true,
              cargo: true,
              createdAt: true,
              tipos_usuarios: {
                select: {
                  id: true,
                  tipo_usuario: true
                }
              },

              personas: {
                select: {
                  apellido_materno: true,
                  apellido_paterno: true,
                  nombre: true,
                }
              },
              meses_experiencia: true,
              experiencias_laborales_usuarios: true,
              educacion_usuarios: {
                select: {
                  centros_educativos: {
                    select: {
                      educacion_usuarios: {
                        select: {
                          tipos_educacion: true
                        }
                      }
                    }
                  },
                  carrera: true,
                  nombre_centro_educativo: true,
                  fecha_final: true,
                  fecha_inicio: true
                }
              },
              cvs_usuarios: true,
              aptitudes_usuarios: {
                select: {
                  aptitudes: true
                }
              },
              empresas: {
                select: {
                  valoraciones_empresas: true,
                }
              },
              valoraciones_usuarios: {
                select: {
                  valoracion: true,
                },
              },
            },
          },
          ofertas: {
            select: {
              id: true,
              sectores: {
                select: {
                  id: true,
                  sector: true
                }
              }
            }
          },
          id: true
        },
      });
      const valoracionesRangos = valoraciones_empresas
        ? valoraciones_empresas.map(valoracion => ({
          gte: valoracion - 0.5,
          lte: valoracion
        }))
        : [];
      const resultPromedio = result.map(postulacion => {
        const usuario = postulacion.usuarios;
        const valoraciones = usuario.valoraciones_usuarios.map(v => new Decimal(v.valoracion));
        let promedioValoraciones = null;
        if (valoraciones.length > 0) {
          const sum = valoraciones.reduce((acumulador, valor) => acumulador.plus(valor), new Decimal(0));
          promedioValoraciones = sum.div(valoraciones.length).toNumber();
        }
        const meses = usuario.experiencias_laborales_usuarios.map(v => v.meses_experiencia)
        let sumMeses = null;
        let anios = null
        if (meses.length > 0) {
          const sum = meses.reduce((acumulador, valor) => acumulador + valor, 0)

          anios = Math.round(sum / 12)
          sumMeses = sum
        }
        return {
          ...postulacion,
          usuarios: {
            ...usuario,
            promedioValoraciones
          },
          anios,
          sumMeses
        };
      }).filter(postulacion => {
        const { anios } = postulacion;
        return anios_experiencia && anios_experiencia.length > 0
          ? anios_experiencia.some(rango => anios >= rango.desde && anios <= rango.hasta)
          : true;
      }).filter(postulacion => {
        if (valoracionesRangos.length > 0) {
          return valoracionesRangos.some(rango => {
            return postulacion.usuarios.promedioValoraciones >= rango.gte && postulacion.usuarios.promedioValoraciones <= rango.lte;
          });
        }
        return true;
      });
      const total = await this.prisma.postulaciones.count({
        where: {
          ofertas: {
            id: idOferta
          },
          usuarios: {
            ...(tipo_usuario ? {
              tipos_usuarios: {
                tipo_usuario: {
                  contains: tipo_usuario,
                },
              },
            } : {}),
            ...whereUsuarios,
            personas: {
              ...wherePersonas,
            },
          },
          ...(sector ? {
            ofertas: {
              sectores: {
                sector
              }
            }
          } : {}),
        },
      })
      if (resultPromedio.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Postulaciones', []);
      }

      console.log(valoraciones_empresasArray, " -- ", tipo_educacionArray, " -- ", anios_experienciaArray)
      const meta = {
        limit: limit,
        page: page,
        total: valoraciones_empresas !== undefined ||
          tipos_educacion !== undefined ||
          anios_experiencia !== undefined ? resultPromedio.length : total,
        ...filter,
        ...paginate
      }
      return formatResponseMessages(true, 'Operacion Exitosa', resultPromedio, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllLatestEmpresaByToken(paginate: PaginationPostulacionDto, request: Request) {
    try {

      const { limit = 10, page = 1, sortColumn = "id", sortOrder = "asc" } = paginate
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busquedaEmpresa = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: userId
        }
      })
      if (!busquedaEmpresa) {
        return formatResponseMessages(true, 'No se encontro una empresa relacionada a este usuario', []);
      }
      const result = await this.prisma.postulaciones.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          ofertas: {
            empresas: {
              id: busquedaEmpresa.id
            }
          }
        },
        orderBy: {
          usuarios: {
            createdAt: "desc"
          }
        },
        include: {
          usuarios: {
            select: {
              id: true,
              usuario: true,

              personas: {
                select: {
                  nombre: true,
                  apellido_materno: true,
                  apellido_paterno: true,
                }
              }
            }
          },
          ofertas: {
            select: {
              id: true,
              cargo: true
            }
          }
        }
      })
      const total = await this.prisma.postulaciones.count({
        where: {
          ofertas: {
            empresas: {
              id: busquedaEmpresa.id
            }
          }
        },
      })
      const meta = {
        limit: limit,
        page: page,

        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      if (result.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Usuarios', []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async updateFasePostulacionNext(id: number, update: UpdateFasePosutlacionDto) {
    const { fase_postulacion_id } = update
    try {
      const busquedaFase = await this.prisma.fases_postulaciones.findFirst({
        where: {
          id: fase_postulacion_id
        }
      })
      if (!busquedaFase) {
        return formatResponseMessages(true, 'la fase_postulacion_id no existe', []);
      }

      let siguienteFase
      if (!fase_postulacion_id) {
        const busqueda = await this.prisma.postulaciones.findFirst({
          where: {
            id
          },
          include: {
            fases_postulaciones: {
              select: {
                id: true,
                prioridad: true
              }
            }
          }
        })
        const total_fases = await this.prisma.fases_postulaciones.findMany()
        const ordenamiento = total_fases.sort((a, b) => a.prioridad - b.prioridad);
        const indiceActual = ordenamiento.findIndex(fase => fase.id === busqueda.fases_postulaciones.id);


        if (indiceActual !== -1 && indiceActual + 1 < ordenamiento.length) {
          siguienteFase = ordenamiento[indiceActual + 1]
        } else {
          siguienteFase = busqueda.fase_postulacion_id
        }
      }

      const update = await this.prisma.postulaciones.update({
        where: {
          id
        },
        data: {
          fase_postulacion_id: fase_postulacion_id ? fase_postulacion_id : siguienteFase.id
        }
      })
      return formatResponseMessages(true, 'Operacion Exitosa', [update]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
