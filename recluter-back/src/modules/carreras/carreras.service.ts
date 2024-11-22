import { Injectable, NotFoundException, OnModuleInit, Req } from '@nestjs/common';
import { CreateCarreraDto } from './dto/create-carrera.dto';
import { UpdateCarreraDto } from './dto/update-carrera.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationCarrerasDto } from './dto/paginate-carreras.dto';
import { Request } from 'express';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
const name = "- Carreras -"
@Injectable()
export class CarrerasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(CarrerasService.name)
  }
  async create(createCarreraDto: CreateCarreraDto,request: Request) {
    try {
      const result = await this.prisma.carreras.create({
        data: {
          ...createCarreraDto
        }
      })
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: "",
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: "carrera",
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(paginate: PaginationCarrerasDto) {
    const { limit = 10, page = 1, carrera, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {
      const where: any = {
        AND: [
          carrera !== undefined ? {
            carrera: {
              contains: carrera,
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.carreras.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.carreras.count({where})
      const meta = {
        limit: limit,
        page: page,
        carrera,total,
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
      const result = await this.prisma.carreras.findFirst({
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

  async update(id: number, updateCarreraDto: UpdateCarreraDto, request:Request) {
    console.log(updateCarreraDto, "--mary")
    try {
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.carreras.update({
          where: { id },
          data: { ...updateCarreraDto }
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

  async remove(id: number, request:Request) {
    try {

      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.carreras.delete({
          where: { id },
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
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
  async findById(id: number) {
    try {
      const busqueda = await this.prisma.carreras.findFirst({
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
