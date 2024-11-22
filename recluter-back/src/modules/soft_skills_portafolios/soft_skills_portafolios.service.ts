import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSoftSkillsPortafolioDto } from './dto/create-soft_skills_portafolio.dto';
import { UpdateSoftSkillsPortafolioDto } from './dto/update-soft_skills_portafolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
const name = "- soft_skills_portafolios -"
@Injectable()
export class SoftSkillsPortafoliosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(SoftSkillsPortafoliosService.name)
  }
  async createOrUpdateSkillOferta(softOferta: CreateSoftSkillsPortafolioDto, request: Request) {
    const { portafolio_usuario_id, soft_skill_id } = softOferta
    try {

      const oferta = await this.prisma.portafolios_usuario.findFirst({ where: { id: portafolio_usuario_id } })
      if (!oferta) {
        return formatResponseMessages(false, "El portafolio_usuario_id no existe en la tabla Portafolio_usuarios", [])
      }

      const skills = await this.prisma.soft_skills.findMany({
        where: {
          id: {
            in: soft_skill_id,
          },
        },
      });
      if (skills.length !== soft_skill_id.length) {
        return formatResponseMessages(false, "Un soft_skill_id no existe en la tabla SOFT_SKILL", []);
      }
      await this.prisma.soft_skills_portafolio.deleteMany({
        where: {
          portafolio_usuario_id: portafolio_usuario_id
        }
      });
      const skill_portafolio = soft_skill_id.map(skill_id => ({
        portafolio_usuario_id: portafolio_usuario_id,
        soft_skill_id: skill_id,
      }))
      const result = await this.prisma.soft_skills_portafolio.createMany({
        data: skill_portafolio,
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


}
