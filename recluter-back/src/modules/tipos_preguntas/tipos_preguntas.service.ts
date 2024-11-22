import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTiposPreguntaDto } from './dto/create-tipos_pregunta.dto';
import { UpdateTiposPreguntaDto } from './dto/update-tipos_pregunta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationTipoPreguntaDto } from './dto';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
import { AuditoriasService } from '../auditorias/auditorias.service';
const name = "- tipo_preguntas -"
@Injectable()
export class TiposPreguntasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(TiposPreguntasService.name)
  }
  async create(createTiposPreguntaDto: CreateTiposPreguntaDto, request:Request) {
    try {
      const result = await this.prisma.tipos_preguntas.create({
        data: {
          ...createTiposPreguntaDto
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

  async findAll(paginate:PaginationTipoPreguntaDto) {
    const { limit = 10, page = 1, nombre_tipo, tipo, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {
      const where: any = {
        AND: [
          nombre_tipo !== undefined ? {
            nombre_tipo: {
              contains: nombre_tipo,
            },
          } : undefined,
          tipo !== undefined ? {
            tipo: {
              contains: tipo,
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.tipos_preguntas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.tipos_preguntas.count()
      const meta = {
        limit: limit,
        page: page,
        nombre_tipo, tipo,
        total,
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
      const result = await this.prisma.tipos_preguntas.findFirst({
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

  async update(id: number, updateTiposPreguntaDto: UpdateTiposPreguntaDto, request:Request) {
    try {
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.tipos_preguntas.update({
          where: { id },
          data: { ...updateTiposPreguntaDto }
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

  async remove(id: number, request:Request) {
    try {

      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.tipos_preguntas.delete({
          where: { id },
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
      const busqueda = await this.prisma.tipos_preguntas.findFirst({
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
