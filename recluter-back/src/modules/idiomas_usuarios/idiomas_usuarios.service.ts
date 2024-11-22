import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateIdiomasUsuarioDto } from './dto/create-idiomas_usuario.dto';
import { UpdateIdiomasUsuarioDto } from './dto/update-idiomas_usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
const name = "- idiomas_usuarios - "
@Injectable()
export class IdiomasUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(IdiomasUsuariosService.name)
  }
  async createOrUpdateNivelesUsuario(createDto: CreateIdiomasUsuarioDto, request: Request) {
    const { nivel_idioma_id } = createDto
    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const oferta = await this.prisma.ofertas.findFirst({ where: { id: userId } })
      if (!oferta) {
        return formatResponseMessages(false, "La usuario_id no existe en la tabla usuarios", [])
      }
      const idiomaNivel = await this.prisma.niveles_idiomas.findMany({
        where: {
          id: {
            in: nivel_idioma_id,
          },
        },
      });
      if (idiomaNivel.length !== nivel_idioma_id.length) {
        return formatResponseMessages(false, "Un nivel_idioma_id no existe en la tabla nivel idiomas", []);
      }
      await this.prisma.idiomas_usuarios.deleteMany({
        where: {
          usuario_id: userId
        }
      });
      const idioma_usuario = nivel_idioma_id.map(nivelIdioma => ({
        usuario_id: userId,
        nivel_idioma_id: nivelIdioma,
      }))
      const result = await this.prisma.idiomas_usuarios.createMany({
        data: idioma_usuario,
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
  async findAllNivelesIdiomasByUsuarioToken(request: Request) {
    try {
      const authHeader = request.headers['authorization'];
      const userId = await this.auditoriaService.getUserIdByToken(authHeader);

      const result = await this.prisma.idiomas_usuarios.findMany({
        where: {
          usuario_id: userId,
        },
        include: {
          niveles_idiomas: {
            include: {
              idiomas: {
                select: {
                  idioma: true,
                },
              },
            },
          },
        },
      });
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
  async findAllNivelesIdiomasByUsuario(id:number) {
    try {

      const result = await this.prisma.idiomas_usuarios.findMany({
        where: {
          usuario_id: id,
        },
        include: {
          niveles_idiomas: {
            include: {
              idiomas: {
                select: {
                  idioma: true,
                },
              },
            },
          },
        },
      });
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
}