

import {  Injectable,  OnModuleInit } from '@nestjs/common';
import { CreateSoftSkillsOfertaDto } from './dto/create-soft_skills_oferta.dto';
import { UpdateSoftSkillsOfertaDto } from './dto/update-soft_skills_oferta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../../modules/auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../../modules/auditorias/auditorias.service';
import { Request } from 'express';

const name = "- SoftSkillOferta -"
@Injectable()
export class SoftSkillsOfertaService implements OnModuleInit  {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(SoftSkillsOfertaService.name)
  }
  async createOrUpdateSkillOferta(softOferta: CreateSoftSkillsOfertaDto, request: Request) {
    const { oferta_id, soft_skill_id } = softOferta
    try {

      const oferta = await this.prisma.ofertas.findFirst({ where: { id: oferta_id } })
      if (!oferta) {
        return formatResponseMessages(false, "La oferta_id no existe en la tabla OFERTAS", [])
      }
      const soft_skill = soft_skill_id.map(skill => skill.id);
      const skills = await this.prisma.soft_skills.findMany({
        where: {
          id: {
            in: soft_skill,
          },
        },
      });
      if (skills.length !== soft_skill_id.length) {
        return formatResponseMessages(false, "Un soft_skill_id no existe en la tabla SOFT_SKILL", []);
      }
      await this.prisma.soft_skills_oferta.deleteMany({
        where: {
          oferta_id: oferta_id
        }
      });
      const skill_Oferta = soft_skill_id.map(skill_id => ({
        oferta_id: oferta_id,
        soft_skill_id: skill_id.id,
        porcentaje: skill_id.porcentaje
      }))
      const result = await this.prisma.soft_skills_oferta.createMany({
        data: skill_Oferta,
        skipDuplicates: true
      })
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
        pk_actualizado: 0
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
  async getAllByOferta(idOferta:number){
    try {
      const objeto = await this.prisma.soft_skills_oferta.findMany({
        where: {
          oferta_id: idOferta,
        },
      });
      if (objeto.length === 0) {
        return formatResponseMessages(true, 'No se encontraron registros', []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', objeto);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

}
