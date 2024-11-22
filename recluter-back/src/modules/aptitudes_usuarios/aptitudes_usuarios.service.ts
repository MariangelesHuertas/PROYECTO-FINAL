import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateAptitudesUsuarioDto } from './dto/create-aptitudes_usuario.dto';
import { UpdateAptitudesUsuarioDto } from './dto/update-aptitudes_usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { DeleteAptitudesUsuarioDto } from './dto/delete-aptitudes_usuario.dto';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
const name = "- AptitudesUsuario -"
@Injectable()
export class AptitudesUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AptitudesUsuariosService.name)
  }
  async create(createAptitudesUsuarioDto: CreateAptitudesUsuarioDto, request: Request) {
    const { aptitud_id } = createAptitudesUsuarioDto
    try {
      const usuario_id = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (await this.busquedaUsuario(usuario_id) && await this.busquedaAptitud(aptitud_id)) {

        const searchUserAptitud = await this.busquedaUsuarioAptitud(usuario_id, aptitud_id)

        let result
        if (!searchUserAptitud) {// false
          result = await this.prisma.aptitudes_usuarios.create({
            data: {
              usuario_id: usuario_id,
              aptitud_id: aptitud_id,
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
        }
        return formatResponseMessages(true, "El usuario_id ya tiene una aptitud_id", [result])
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaUsuario(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.usuarios.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaAptitud(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.aptitudes.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaUsuarioAptitud(usuario_id: number, aptitud_id: number) {
    try {
      const resultado = await this.prisma.aptitudes_usuarios.findFirst({
        where: {
          usuario_id: usuario_id,
          aptitud_id: aptitud_id
        }
      })
      return resultado
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
/*   findAll() {
    return `This action returns all aptitudesUsuarios`;
  } */

  async findByUserToken(request:Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.aptitudes_usuarios.findMany({
        where: {
          usuario_id: userId
        },
        include: {
          aptitudes: true
        }
      })
      if (!result) {
        return formatResponseMessages(false, `No se encontro el registro ${name}`, [])
      }
      return formatResponseMessages(true, "Operacion Exitosa", result)
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findByUser(id:number) {
    try {
      const result = await this.prisma.aptitudes_usuarios.findMany({
        where: {
          usuario_id: id
        },
        include: {
          aptitudes: true
        }
      })
      if (!result) {
        return formatResponseMessages(false, `No se encontro el registro ${name}`, [])
      }
      return formatResponseMessages(true, "Operacion Exitosa", result)
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
/* 
  update(id: number, updateAptitudesUsuarioDto: UpdateAptitudesUsuarioDto) {
    return `This action updates a #${id} aptitudesUsuario`;
  }
 */
  async remove(aptitude_id:number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.aptitudes_usuarios.delete({
        where: {
          usuario_id_aptitud_id: {
            usuario_id: userId,
            aptitud_id: aptitude_id
          }
        }
      });
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Eliminamos una ${name} a traves de  su aptitud y usuario`,
        accion: 1,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: result.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
