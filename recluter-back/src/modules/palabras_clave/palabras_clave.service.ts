import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePalabrasClaveDto } from './dto/create-palabras_clave.dto';
import { UpdatePalabrasClaveDto } from './dto/update-palabras_clave.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationPalabrasClaveDto } from './dto';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
const name = "- Palabras-clave -"
@Injectable()
export class PalabrasClaveService implements OnModuleInit  {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PalabrasClaveService.name)
  }
  async create(createPalabrasClaveDto: CreatePalabrasClaveDto,request: Request) {
    try {
      const result = await this.prisma.palabras_claves.create({
        data: {
          ...createPalabrasClaveDto
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

  async findAll(paginatePermiso:PaginationPalabrasClaveDto) {
    const { limit = 10, page = 1, palabra , sortColumn = "id", sortOrder = "asc" } = paginatePermiso;
    try {
      const where: any = {
        AND: [
          palabra ? {
            palabra: {
              contains: palabra,
              //mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const permisos = await this.prisma.palabras_claves.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.palabras_claves.count()

      if (permisos.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta ={
        limit:limit , 
        page:page , 
        palabra:palabra , total,
        sortColumn:sortColumn , 
        sortOrder:sortOrder
    }
      return formatResponseMessages(true, 'Operacion Exitosa', permisos, null  ,meta );
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number) {
    try {
      const palabraClave = await this.prisma.palabras_claves.findFirst({
        where: {
          id: id
        }
      })
      if (!palabraClave) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
      return formatResponseMessages(true, "Operacion Exitosa", [palabraClave])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error)
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message))
    }
  }

  async update(id: number, updatePalabrasClaveDto: UpdatePalabrasClaveDto,request: Request) {
    try {
      const busqueda = this.findByIdPalabraClave(id)
      if(busqueda){
        const result = await this.prisma.palabras_claves.update({
          where: {id},
          data:{...updatePalabrasClaveDto}
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

  async remove(id: number,request: Request) {
    try {
     
      const busqueda = this.findByIdPalabraClave(id)
      if(busqueda){
        const result = await this.prisma.palabras_claves.delete({
          where: {id},
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
      }else{
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findByIdPalabraClave(id:number){
    try {
      const busqueda = await this.prisma.palabras_claves.findFirst({
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
