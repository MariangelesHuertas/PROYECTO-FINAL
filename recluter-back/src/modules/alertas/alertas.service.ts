import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationAlertaDto } from './dto';
import { Request } from 'express';
const name = "- Alertas -"
@Injectable()
export class AlertasService implements OnModuleInit {

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AlertasService.name)
  }
  async create(createAlertaDto: CreateAlertaDto, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const result = await this.prisma.alertas.create({
        data: {
          usuario_id: userId,
          ...createAlertaDto
        }
      })
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
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(usuarioId: number, paginate: PaginationAlertaDto) {
    const { limit = 10, page = 1, nombre, cargo, temporalidad, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {
      const where: any = {
        AND: [
          nombre !== undefined ? {
            nombre: {
              contains: nombre,
            },
          } : undefined,
          cargo !== undefined ? {
            cargo: {
              contains: cargo,
            },
          } : undefined,
          temporalidad !== undefined ? {
            temporalidad: {
              contains: temporalidad,
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.alertas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: usuarioId
          , ...where,

        },
        orderBy
      });

      const total = await this.prisma.alertas.count()
      const meta = {
        limit: limit,
        page: page,
        nombre, cargo, temporalidad, total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number) {
    try {
      const result = await this.prisma.alertas.findFirst({
        where: { id: id }
      });
      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateAlertaDto: UpdateAlertaDto, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.alertas.update({
          where: { id  , usuario_id:userId},
          data: { ...updateAlertaDto }
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
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.alertas.delete({
          where: { id , usuario_id:userId },
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
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findById(id: number): Promise<Boolean> {
    try {
      const busqueda = await this.prisma.alertas.findFirst({
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
}
