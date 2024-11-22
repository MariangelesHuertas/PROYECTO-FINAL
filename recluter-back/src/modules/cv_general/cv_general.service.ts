import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateCvGeneralDto } from './dto/create-cv_general.dto';
import { UpdateCvGeneralDto } from './dto/update-cv_general.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { PaginationCvUsuariosGeneral } from './dto/pagination-cv_general.dto';
import { FilterCvGeneral } from './dto/filter-cv_general.dto';
import { formatResponseMessages, formatResponseObjectMessages } from 'src/common/Error/interfaces/response.interface';

@Injectable()
export class CvGeneralService implements OnModuleInit {

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(CvGeneralService.name)
  }




  async findAll(paginate: PaginationCvUsuariosGeneral, filtros: FilterCvGeneral) {
    const { limit = 10, page = 1, apellido_materno, apellido_paterno, cargo, meses_experiencia, nombre, ubicacion, usuario, sortColumn = "id", sortOrder = "asc" } = paginate;
    //const { aptitudesArray = [], centrosEducativosArray = [], nivelIdiomaArray , idiomasArray = [] } = filtros
    /* const { aptitudesArray, centrosEducativosArray, nivelIdiomaArray, idiomasArray } = filtros */
    const {
      aptitudesArray = undefined,
      centrosEducativosArray = undefined,
      nivelIdiomaArray = undefined,
      idiomasArray = undefined
    } = filtros;
    const aptitudes = (aptitudesArray && aptitudesArray.length === 0) ? undefined : aptitudesArray;
    const centrosEducativos = (centrosEducativosArray && centrosEducativosArray.length === 0) ? undefined : centrosEducativosArray;
    const nivelIdioma = (nivelIdiomaArray && nivelIdiomaArray.length === 0) ? undefined : nivelIdiomaArray;
    const idiomas = (idiomasArray && idiomasArray.length === 0) ? undefined : idiomasArray;
    try {
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

      };

      const orderBy: { [key: string]: string } = {
        [sortColumn]: sortOrder,
      };

      const result = await this.prisma.usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        orderBy,
        where: {
          tipos_usuarios: {
            tipo_usuario: "Candidato"
          },
          ...whereUsuarios,
          personas: {
            ...wherePersonas,

          },

          ...(centrosEducativos != undefined
            ? {
              educacion_usuarios: {
                some: {
                  nombre_centro_educativo: {
                    in: centrosEducativos,
                  },
                },
              },
            } : {}),
          ...(aptitudes != undefined
            ? {
              aptitudes_usuarios: {
                some: {
                  aptitudes: {
                    aptitud: {
                      in: aptitudes,
                    },
                  },
                },
              },
            }
            : {}),

          ...(nivelIdioma != undefined
            ? {
              idiomas_usuarios: {
                some: {
                  niveles_idiomas: {
                    nivel: {
                      in: nivelIdioma
                    }
                  },
                },
              },
            }
            : {}),
          ...(idiomas != undefined
            ? {
              idiomas_usuarios: {
                some: {
                  niveles_idiomas: {
                    idiomas: {
                      idioma: {
                        in: idiomas,
                      },
                    },
                  },
                },
              },
            }
            : {}),

        },
        select: {
          id: true,
          usuario: true,
          ubicacion: true,
          meses_experiencia: true,
          imagen: true,
          personas: {
            select: {
              nombre: true,
              apellido_materno: true,
              apellido_paterno: true,
            },
          },
          soft_skills_usuarios : {
            select : {
              soft_skills : {
                select : {
                  soft_skill : true
                }
              },
              nivel: true,
              porcentaje: true
            }
          },

          aptitudes_usuarios: {
            select: {
              aptitudes: {
                select: {
                  id: true,
                  aptitud: true,
                },
              },
            },
          },
          educacion_usuarios: true,
          idiomas_usuarios: {
            include: {
              niveles_idiomas: {
                select: {
                  nivel: true,
                  idiomas: {
                    select: {
                      idioma: true
                    }
                  }
                }
              }
            }
          },
          cvs_usuarios: {
            where: {
              default: true,
            },
          },
          experiencias_laborales_usuarios: {
            orderBy: {
              fecha_fin: "desc",
            },
            take: 2,
          },
          valoraciones_usuarios: true,
        },
      });

      const resultados = [];
      for (const usuario of result) {

        const valoraciones = await this.prisma.valoraciones_usuarios.aggregate({
          _count: {
            usuarios: true
          },
          _avg: {
            valoracion: true
          },
          where: {
            usuarios: usuario.id
          }
        });


        resultados.push({
          ...usuario,
          valoracionesCount: valoraciones._count.usuarios,
          valoracionesPromedio: valoraciones?._avg?.valoracion?.toFixed(2)
        });
      }

      /* TOTAL - ---- COUNT */
      const total = await this.prisma.usuarios.count({
        where: {
          tipos_usuarios: {
            tipo_usuario: "Candidato"
          },
          ...whereUsuarios,
          personas: {
            ...wherePersonas,

          },

          ...(centrosEducativosArray
            ? {
              educacion_usuarios: {
                some: {
                  nombre_centro_educativo: {
                    in: centrosEducativosArray,
                  },
                },
              },
            } : {}),
          ...(aptitudesArray
            ? {
              aptitudes_usuarios: {
                some: {
                  aptitudes: {
                    aptitud: {
                      in: aptitudesArray,
                    },
                  },
                },
              },
            }
            : {}),

          ...(nivelIdiomaArray
            ? {
              idiomas_usuarios: {
                some: {
                  niveles_idiomas: {
                    nivel: {
                      in: nivelIdiomaArray
                    }
                  },
                },
              },
            }
            : {}),
          ...(idiomasArray
            ? {
              idiomas_usuarios: {
                some: {
                  niveles_idiomas: {
                    idiomas: {
                      idioma: {
                        in: idiomasArray,
                      },
                    },
                  },
                },
              },
            }
            : {}),

        },
      })

      const meta = {
        ...filtros, ...paginate, total
      }

      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron usuarios`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', resultados, null, meta);


    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findCVbyUer(id: number) {
    try {
      const result = await this.prisma.usuarios.findFirst({
        where: {
          id
        },
        select: {
          id: true,
          usuario: true,
          imagen: true,
          imagen_banner: true,
          cargo: true,
          sobreMi: true,
          meses_experiencia: true,
          ubicacion: true,

          personas: {
            select: {
              nombre: true,
              apellido_materno: true,
              apellido_paterno: true,
            }
          },
          tipos_usuarios: {
            where: {
              tipo_usuario: "Candidato"
            }
          }

        }
      })
      return formatResponseObjectMessages(true, 'Operacion Exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


}
