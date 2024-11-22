import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateValoracionesUsuarioDto } from './dto/create-valoraciones_usuario.dto';
import { UpdateValoracionesUsuarioDto } from './dto/update-valoraciones_usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, formatResponseObjectMessages } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../../modules/auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../../modules/auditorias/auditorias.service';
import { PaginationValoracionesUDto } from './dto/paginate-valoraciones_usuario.dto';
import Decimal from 'decimal.js';
const name = "- Valoraciones_usuario -"

@Injectable()
export class ValoracionesUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(ValoracionesUsuariosService.name)
  }
  async createOrUpdate(createValoracionesUsuarioDto: CreateValoracionesUsuarioDto, request: Request) {

    const { link_valoracion, ...rest } = createValoracionesUsuarioDto

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const searchLink = await this.prisma.usuarios.findUnique({
        where: {
          link_valoracion
        }
      })

      if (userId == searchLink.id) {
        return formatResponseMessages(true, "Usuarios iguales , no puedes valorarte a ti mismo", [])
      }

      if (await this.busquedaUsuario(userId) && await this.busquedaUsuario(searchLink.id)) {
        const searchUserEmpre = await this.busquedaUsuarioValoracion(userId, searchLink.id)

        let result
        if (searchUserEmpre) {
          result = await this.prisma.valoraciones_usuarios.update({
            where: {
              usuario_id_usuarios: {
                usuario_id: userId,
                usuarios: searchLink.id,
              },
            },
            data: {
              ...rest
            },
          });
        } else {
          result = await this.prisma.valoraciones_usuarios.create({
            data: {
              usuario_id: userId,
              usuarios: searchLink.id,
              ...rest
            }
          })
        }
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
          descripcion: `Creamos o Actualizamos una ${name}`,
          accion: "createOrUpdate",
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, "Operacion Exitosa", [result])
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
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
  async busquedaUsuarioValoracion(usuario_id: number, usuarios: number) {
    try {
      const resultado = await this.prisma.valoraciones_usuarios.findFirst({
        where: {
          usuario_id: usuario_id,
          usuarios: usuarios
        }
      })
      return resultado
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findByUser(id: number, paginate: PaginationValoracionesUDto) {
    console.log("entro al finbyser")
    const {
      limit = 10,
      page = 1,
      observacion,
      valoracion,
      sortColumn = "id",
      sortOrder = "asc"
    } = paginate;

    try {

      const where: any = {
        AND: [
          observacion !== undefined ? {
            observacion: {
              contains: observacion
            }
          } : undefined,
          valoracion !== undefined ? {
            valoracion: {
              equals: valoracion
            }
          } : undefined,
        ].filter(Boolean)
      }

      const result = await this.prisma.valoraciones_usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { usuarios: id, ...where },
        select: {
          id: true,
          usuario_id: true,
          observacion: true,
          valoracion: true,
          createdAt: true,
          usuario: {
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
      })


      const total = await this.prisma.valoraciones_usuarios.count({
        where: {
          usuarios: id,
          ...where
        },
      })
      const sumatoria = result.reduce((acumulador, valor) => acumulador.plus(valor.valoracion), new Decimal(0));
      const promedioValoraciones = sumatoria.div(total).toNumber()

      const meta = {
        limit: limit,
        page: page,
        total, observacion, valoracion,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }

      if (result.length === 0) {
        return formatResponseMessages(false, `No se encontraron ${name}`, []);
      }

      return formatResponseObjectMessages(true, 'Operacion Exitosa', {
        valoraciones_usuarios: result,
        valoracion: promedioValoraciones.toFixed(2)
      }, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByToken(request: Request, paginate: PaginationValoracionesUDto) {
    const { limit = 10, page = 1, observacion, valoracion, sortColumn = "created_at", sortOrder = "desc" } = paginate;
    const where: any = {
      AND: [
        observacion !== undefined ? {
          observacion: {
            contains: observacion
          }
        } : undefined,
        valoracion !== undefined ? {
          valoracion: {
            equals: valoracion
          }
        } : undefined,
      ].filter(Boolean)
    }

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.valoraciones_usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { usuarios: userId, ...where },
        select: {
          id: true,
          observacion: true,
          valoracion: true,
          createdAt: true,
          usuario: {
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
      })
      const total = await this.prisma.valoraciones_usuarios.count({
        where: {
          usuarios: userId,
          ...where
        },
      })
      const sumatoria = result.reduce((acumulador, valor) => acumulador.plus(valor.valoracion), new Decimal(0));
      const promedioValoraciones = sumatoria.div(total).toNumber()
      const meta = {
        limit: limit,
        page: page,
        total, observacion, valoracion,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }

      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseObjectMessages(true, 'Operacion Exitosa', {
        valoraciones_usuarios: result,
        valoracion: promedioValoraciones.toFixed(2)
      }, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

}
