import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostulacionesGuardadaDto } from './dto/create-postulaciones_guardada.dto';
import { UpdatePostulacionesGuardadaDto } from './dto/update-postulaciones_guardada.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
import { PaginationPostulacionesGuardadasDto } from './dto/paginate-postulaciones_guardadas.dto';
const name = "- Postulaciones-Guardadas -"
@Injectable()
export class PostulacionesGuardadasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PostulacionesGuardadasService.name)
  }

  async create(createPostulacionesGuadadaDto: CreatePostulacionesGuardadaDto, request: Request) {
    const { oferta_id } = createPostulacionesGuadadaDto
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (
        await this.busquedaUsuario(userId) &&
        await this.busquedaOferta(oferta_id)
      ) {

        let result: any = {};
        let accionAuditoria = 1;
        const postulacion_guarda: { id: number } | null = await this.busquedaPostulacionesGuardadas(userId, oferta_id);

        if (postulacion_guarda !== null) {
          result = await this.prisma.postulaciones_guardadas.delete({
            where: {
              id: postulacion_guarda.id
            }
          })
          accionAuditoria = 3;

        } else {
          result = await this.prisma.postulaciones_guardadas.create({
            data: {
              usuario_id: +userId,
              oferta_id: oferta_id
            }
          })
        }

        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
          descripcion: "",
          accion: accionAuditoria,
          ruta: request.url,
          log: "",
          tabla: "postulaciones_guardadas",
          pk_actualizado: result?.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, "Operacion Exitosa", [result])

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
      const busqueda = await this.prisma.usuarios.findFirst({ where: { id: +id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async busquedaOferta(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.ofertas.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async busquedaPostulacionesGuardadas(usuario_id: number, oferta_id: number): Promise<{ id: number }> {
    try {
      const busqueda: { id: number } | null = await this.prisma.postulaciones_guardadas.findFirst({ where: { usuario_id: +usuario_id, oferta_id } })
      return busqueda
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByUser(id: number) {
    try {

      const result = await this.prisma.postulaciones_guardadas.findFirst({
        where: { usuario_id: id }
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


  async getAllByUser(paginate: PaginationPostulacionesGuardadasDto, request: Request) {

    const { limit = 10, sector, page = 1 } = paginate;

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization']);

      const result = await this.prisma.postulaciones_guardadas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { 
          usuario_id: userId ,
          ofertas:{
            sectores:{
              sector:{
                contains:sector
              }
            }
          }
        },
        include:{
          ofertas:{
            include:{
              sectores:true
            }
          }
        }
      });

      const total = await this.prisma.postulaciones_guardadas.count({
        where: { 
          usuario_id: userId ,
          ofertas:{
            sectores:{
              sector
            }
          }
        },
      }
      )

      const meta = {
        limit: limit,
        page: page,
        total
      }

      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }

      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request: Request) {
    try {

      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.postulaciones.delete({
          where: { id },
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
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error)
      throw new BadRequestException(formatResponseMessages(false, "Error", [], message))
    }
  }

  async findById(id: number) {
    try {
      const busqueda = await this.prisma.postulaciones.findFirst({
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
