import { BadRequestException, Injectable, NotFoundException, OnModuleInit} from '@nestjs/common';
import { CreateAptitudeDto } from './dto/create-aptitude.dto';
import { UpdateAptitudeDto } from './dto/update-aptitude.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationAptitudeDto } from './dto/pagination-aptitude.dto';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';

import { Request } from 'express';
const name = "- Aptitudes -"
@Injectable()
export class AptitudesService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AptitudesService.name)
  }

  async create(createAptitudeDto: CreateAptitudeDto ,request: Request) {
    try {
      const result = await this.prisma.aptitudes.create({
        data: {
          ...createAptitudeDto
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

  async findAll(paginationAptitude:PaginationAptitudeDto) {
    const { limit = 10, page = 1,  aptitud , sortColumn = "id", sortOrder = "asc" } = paginationAptitude;
    try {
      const where: any = {
        AND: [
          aptitud ? {
            aptitud: {
              contains: aptitud,
              //mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const permisos = await this.prisma.aptitudes.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.aptitudes.count()
      const meta ={
        limit:limit , 
        page:page , 
        aptitud:aptitud ,total, 
        sortColumn:sortColumn , 
        sortOrder:sortOrder
    }
      if (permisos.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', permisos , null  ,meta );
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number) {
    try {
      const aptitud = await this.prisma.aptitudes.findFirst({
        where: {
          id: id
        }
      })
      if (!aptitud) {
        throw new NotFoundException(formatResponseMessages(false, "No se encontro el registro Apititud", []))
      }
      return formatResponseMessages(true, "Operacion Exitosa", [aptitud])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateAptitudeDto: UpdateAptitudeDto , request:Request) {
    try {
      const busqueda = this.findById(id)
      if(busqueda){
        const result = await this.prisma.aptitudes.update({
          where: {id},
          data:{...updateAptitudeDto}
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
      }else{
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request:Request) {
    try {
      const busqueda = this.findById(id)
      if(busqueda){
        const result = await this.prisma.aptitudes.delete({
          where: {id},
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
      }else{
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findById(id:number){
    try {
      const busqueda = await this.prisma.aptitudes.findFirst({
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
