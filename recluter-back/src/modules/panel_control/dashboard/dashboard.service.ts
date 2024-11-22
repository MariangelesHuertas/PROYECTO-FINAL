import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from 'src/modules/auditorias/auditorias.service';
import { FilterInscritosOfertas } from './dto/filter-IncritosOferta.dto';
import { PaginationInscritosOfertaDto } from './dto/paginate-inscritosOferta.dto';
import { formatResponseMessages, formatResponseObjectMessages } from 'src/common/Error/interfaces/response.interface';
import { Request } from 'express';
import * as moment from 'moment-timezone';
import { PaginationInscritosDiaOfertaDto } from './dto/paginate-inscritosDiaOferta';
@Injectable()
export class DashboardService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,

  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(DashboardService.name)
  }
  create(createDashboardDto: CreateDashboardDto) {
    return 'This action adds a new dashboard';
  }

  findAll() {
    return `This action returns all dashboard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dashboard`;
  }

  update(id: number, updateDashboardDto: UpdateDashboardDto) {
    return `This action updates a #${id} dashboard`;
  }

  remove(id: number) {
    return `This action removes a #${id} dashboard`;
  }
  async findEmpresa(request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.empresas.findFirst({
        where: {
          usuario_id: userId
        }
      })
      if (result === null) {
        return formatResponseMessages(true, "No hay empresas para este usuario", [])
      }
      return formatResponseMessages(true, "Operacion Exitosa", [result])

    } catch (error) {
      console.log("entro al error")
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllInscritoOferta(idOferta: number, filter: FilterInscritosOfertas, paginate: PaginationInscritosOfertaDto, request: Request
  ) {
    const { limit = 10, page = 1 } = paginate;
    try {
      const { dias = 0, horas = 0, hoy = false, allOfertas = false } = filter;
      const empresaId = (await this.findEmpresa(request)).data?.[0].id;
      const timezoneHeader = request.headers['timezone'];
      const timezone = Array.isArray(timezoneHeader) ? timezoneHeader[0] : timezoneHeader || 'UTC';
      let result = null;

      if (!allOfertas) {//false
        if (idOferta) {
          result = await this.prisma.ofertas.findFirst({
            where: { id: idOferta },
            include: {
              postulaciones: { orderBy: { createdAt: 'desc' } },
            },
          });
        } else {
          result = await this.prisma.ofertas.findFirst({
            orderBy: { createdAt: 'desc' },
            include: { postulaciones: true },
          });
        }
      } else {
        result = await this.prisma.ofertas.findMany({
          where: { empresa_id: empresaId },
          orderBy: { createdAt: 'desc' },
          include: {
            postulaciones: {
              select: {
                usuarios: {
                  select: {
                    usuario: true,
                  }

                },
                ofertas: {
                  select: {
                    cargo: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' }
            },

          },
        });
      }

      if (!result) {
        throw new Error('Oferta no encontrada');
      }

      const now = moment().tz(timezone);
      let inicioRango: moment.Moment | null = null;
      const finRango = now.clone().endOf('day');

      if (hoy) {
        inicioRango = now.clone().startOf('day');
      }
      if (horas > 0) {
        inicioRango = now.clone().subtract(horas, 'hours');
      }
      if (dias > 0) {
        inicioRango = now.clone().subtract(dias, 'days').startOf('day');
      }

      let resultFilter = null;

      if (!allOfertas) {
        resultFilter = result.postulaciones
          .filter(p => {
            const createdAt = moment(p.createdAt).tz(timezone);
            return inicioRango && createdAt.isBetween(inicioRango, finRango);
          })
          .sort((a, b) =>
            moment(b.createdAt).tz(timezone).diff(moment(a.createdAt).tz(timezone))
          );
      } else {
        // const allPostulaciones = result
        const allPostulaciones = result.reduce((acc, oferta) => {
          const postulacionesFiltradas = oferta.postulaciones.filter(p => {
            const createdAt = moment(p.createdAt).tz(timezone);
            return inicioRango && createdAt.isBetween(inicioRango, finRango);
          });
          return [...acc, ...postulacionesFiltradas];
        }, []);
        resultFilter = allPostulaciones.sort((a, b) =>
          moment(b.createdAt).tz(timezone).diff(moment(a.createdAt).tz(timezone))
        );
      }

      const indiceInicio = (page - 1) * limit;
      const indiceFinal = page * limit;
      const FilterPaginate = resultFilter.slice(indiceInicio, indiceFinal);

      if (result.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }

      const meta = {
        limit: limit,
        page: page,
      };
      const { cargo } = result;
      return formatResponseObjectMessages(
        true,
        'Operacion Exitosa',
          {
            nombre: cargo,
            totalInscritos: resultFilter.length,
            FilterPaginate,
          },
       
        null,
        meta,
      );
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


  async inscritosByDia(idOferta: number, paginate: PaginationInscritosDiaOfertaDto, request: Request) {
    const { dias = 15, limit = 10, page = 1, allOfertas = false } = paginate
    try {
      const empresaId = (await this.findEmpresa(request)).data?.[0].id;

      const timezoneHeader = request.headers['timezone'];
      const timezone = Array.isArray(timezoneHeader) ? timezoneHeader[0] : timezoneHeader || 'UTC';

      const fechaActual = moment().tz(timezone).subtract(dias, 'days').startOf('day').toDate();
      const fechaFinal = moment().tz(timezone).endOf('day');
      const diasArray = [];
      let result = null;

      if (idOferta) {
        result = await this.prisma.ofertas.findFirst({
          where: {
            id: idOferta,
          },
          include: {
            postulaciones: {
              orderBy: {
                createdAt: "desc"
              },
              where: {
                createdAt: {
                  gte: fechaActual
                }
              }
            }
          },
        });
      } else {
        console.log("relacion MUCHO SSSSS")
        result = await this.prisma.ofertas.findMany({
          where: {
            empresa_id: empresaId
          },
          include: {
            postulaciones: {
              orderBy: {
                createdAt: "desc"
              },
              where: {
                createdAt: {
                  gte: fechaActual
                }
              }
            },
          }
        });
      }
      let resultAgrup = null
      if (idOferta) {
        resultAgrup = result.postulaciones.reduce((acumulador, conten) => {
          const fecha = conten.createdAt.toISOString().split("T")[0]
          if (!acumulador[fecha]) {
            acumulador[fecha] = 0;
          }
          acumulador[fecha] += 1;
          return acumulador
        }, {})
      } else {
        resultAgrup = result.reduce((acumulador, oferta) => {
          oferta.postulaciones.map((postulacion) => {
            const fecha = postulacion.createdAt.toISOString().split("T")[0];
            if (!acumulador[fecha]) {
              acumulador[fecha] = 0;
            }
            acumulador[fecha] += 1;
          });
          return acumulador;
        }, {});
      }

      if (result.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Ofertas', []);
      }
      const meta = {
        limit: limit,
        page: page,
      }
      for (let i = 0; i < dias; i++) {
        const fecha = moment().tz(timezone).subtract(i, 'days').format('DD/MM/YYYY');
        diasArray.unshift({
          date: fecha,
          count: 0
        });
      }
      const { cargo } = result
      Object.entries(resultAgrup).forEach(([fecha, cantidad]) => {
        const fechaFormateada = moment(fecha).format('DD/MM/YYYY');
        const diaExistente = diasArray.find(item => item.date === fechaFormateada);
        if (diaExistente) {
          diaExistente.count = cantidad;
        }
      });
      diasArray.sort((a, b) => {
        return moment(b.date, 'DD/MM/YYYY').valueOf() - moment(a.date, 'DD/MM/YYYY').valueOf();
      });
      return formatResponseMessages(true, 'Operacion Exitosa', [{
        nombre: cargo,
        inscritos: diasArray

      }], null, meta);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findAllInscritosOfertaGroupByFases(  request: Request) {
    try {
      const empresaId = (await this.findEmpresa(request)).data?.[0].id;
      const fases = await this.prisma.fases_postulaciones.findMany({

      })
      console.log(fases)

      const sumario_candidatos = fases.map(f => {
        return {
          fase: f.fase,
          porcentaje: 0,
          cantidadInscritos: 0
        }
      })
      console.log(sumario_candidatos)

      const result = await this.prisma.postulaciones.findMany({
        where: {
          ofertas:{
            empresa_id:empresaId
          }
        },
        select: {
          id: true,
          usuarios: {
            select: {
              usuario: true
            }
          },
          fases_postulaciones: true
        }
      })
      const totalCandidatos = result.length;

      result.map(r => {
        const fasePostulacion = r.fases_postulaciones.fase
        const fase = sumario_candidatos.find(f => f.fase === fasePostulacion)
        if (fase) {
          fase.cantidadInscritos += 1
        }
      })
      sumario_candidatos.map(r => {
        if (totalCandidatos > 0) {
          r.porcentaje = Math.round((r.cantidadInscritos / totalCandidatos) * 100 * 100) / 100;
        }
      })

      return formatResponseMessages(
        true,
        'Operacion Exitosa',
        sumario_candidatos,
      );
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

}
