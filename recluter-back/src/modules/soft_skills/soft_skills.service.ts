import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateSoftSkillDto } from './dto/create-soft_skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft_skill.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationSoftSkillDto } from './dto/pagination-soft_skill.dtos';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';

const name = "- Soft_skills -"
@Injectable()
export class SoftSkillsService implements OnModuleInit  {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(SoftSkillsService.name)
  }
  async create(createSoftSkillDto: CreateSoftSkillDto,  request: Request) {
    try {
      const result = await this.prisma.soft_skills.create({
        data: {
          ...createSoftSkillDto
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

  async findAll(paginatinSoftSkill:PaginationSoftSkillDto) {
    const { limit = 10, page = 1,  soft_skill , sortColumn = "id", sortOrder = "asc" } = paginatinSoftSkill;
    try {
      const where: any = {
        AND: [
          soft_skill ? {
            soft_skill: {
              contains: soft_skill,
              //mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const permisos = await this.prisma.soft_skills.findMany({
        skip: page,
        take: limit,
        where,
        orderBy
      });

      const total = await this.prisma.soft_skills.count()
      if (permisos.length === 0) {
        return formatResponseMessages(true, `No se encontraron  ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        soft_skill:soft_skill,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', permisos,null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number) {
    try {
      const oferta = await this.prisma.soft_skills.findFirst({
        where: {
          id: id
        }
      })
      if (!oferta) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name} `, []))
      }
      return formatResponseMessages(true, "Operacion Exitosa", [oferta])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async update(id: number, updateSoftSkillDto: UpdateSoftSkillDto,  request: Request) {
    try {
      const busqueda = this.findByIdObjeto(id)
      if(busqueda){
        const result= await this.prisma.soft_skills.update({
          where: {id},
          data:{...updateSoftSkillDto}
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

  async remove(id: number,  request: Request) {
    try {
      const search = this.findByIdObjeto(id)
      if(search){
        const result = await this.prisma.soft_skills.delete({
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
  async findByIdObjeto(id:number){
    try {
      const busqueda = await this.prisma.soft_skills.findFirst({
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
