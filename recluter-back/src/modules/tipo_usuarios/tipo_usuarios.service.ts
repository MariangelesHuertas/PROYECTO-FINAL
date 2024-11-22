import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTipoUsuarioDto } from './dto/create-tipo_usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo_usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
const name = "- TipoUsuarios -"
@Injectable()
export class TipoUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(TipoUsuariosService.name)
  }
  async create(createTipoUsuarioDto: CreateTipoUsuarioDto, request: Request): Promise<ResponseFormat> {
    try {
      const result = await this.prisma.tipos_usuarios.create({
        data: {
          ...createTipoUsuarioDto
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
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAll(): Promise<ResponseFormat> {
    try {
      const tipoUsuario = await this.prisma.tipos_usuarios.findMany()
      if (tipoUsuario.length === 0) {
        return formatResponseMessages(true, 'No se encontraron Tipos de Usuario', []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', tipoUsuario);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoUsuario`;
  }

  async update(id: number, updateTipoUsuarioDto: UpdateTipoUsuarioDto, request: Request): Promise<ResponseFormat> {
    try {
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.tipos_usuarios.update({
          where: { id },
          data: {
            ...updateTipoUsuarioDto
          }
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

  remove(id: number) {
    return `This action removes a #${id} tipoUsuario`;
  }

  async findById(id: number) {
    try {
      const busqueda = await this.prisma.tipos_usuarios.findFirst({
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
