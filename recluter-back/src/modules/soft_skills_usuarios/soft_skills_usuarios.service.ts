import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSoftSkillsUsuarioDto } from './dto/create-soft_skills_usuario.dto';
import { UpdateSoftSkillsUsuarioDto } from './dto/update-soft_skills_usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
const name = "- soft-skill-usuario -"
@Injectable()
export class SoftSkillsUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(SoftSkillsUsuariosService.name)
  }
  async createOrUpdateSkillOferta(softOferta: CreateSoftSkillsUsuarioDto, request: Request) {
    const { soft_skills } = softOferta
    try {
      let soft_skillArray = []
      for (const soft_skill of soft_skills) {
        if (soft_skill.id == null) {
          const nueva = await this.prisma.soft_skills.create({
            data: {
              aprobado: false,
              soft_skill: soft_skill.soft_skill
            }
          });
          soft_skillArray.push({ id: nueva.id, soft_skill: nueva.soft_skill, porcentaje: soft_skill.porcentaje, nivel: soft_skill.nivel });
        } else {
          const busqueda = await this.prisma.soft_skills.findFirst({
            where: {
              id: soft_skill.id
            }
          })
          if (busqueda) {
            soft_skillArray.push({ id: busqueda.id, soft_skill: busqueda.soft_skill, porcentaje: soft_skill.porcentaje, nivel: soft_skill.nivel });
          }
        }
      }
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const soft_skill = soft_skillArray.map(skill => skill.id);
      const skills = await this.prisma.soft_skills.findMany({
        where: {
          id: {
            in: soft_skill,
          },
        },
      });
      if (skills.length !== soft_skillArray.length) {
        return formatResponseMessages(false, "Un soft_skill_id no existe en la tabla SOFT_SKILL", []);
      }
      await this.prisma.soft_skills_usuarios.deleteMany({
        where: {
          usuario_id: userId
        }
      });
      const skill_usuarios = soft_skillArray.map(skill_id => ({
        usuario_id: userId,
        soft_skill_id: skill_id.id,
        porcentaje: skill_id.porcentaje,
        nivel: skill_id.nivel
      }))
      const result = await this.prisma.soft_skills_usuarios.createMany({
        data: skill_usuarios,
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
  async findAllByUsuarioToken(request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const objeto = await this.prisma.soft_skills_usuarios.findMany({
        where: {
          usuario_id: userId,
        },
        include: {
          soft_skills: true
        }
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

  async findAllByUsuario(id: number) {
    try {
      const objeto = await this.prisma.soft_skills_usuarios.findMany({
        where: {
          usuario_id: id,
        },
        include: {
          soft_skills: true
        }
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
