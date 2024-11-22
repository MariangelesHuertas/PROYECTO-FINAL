import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateAptitudesOfertaDto } from './dto/create-aptitudes_oferta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
const name = "- AptitudesOferta -"
@Injectable()
export class AptitudesOfertaService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AptitudesOfertaService.name)
  }
  async createOrUpdateAptitudeOferta(aptitudOferta: CreateAptitudesOfertaDto, request: Request) {
    const {aptitudes_array , oferta_id } = aptitudOferta
    try {

      let aptitudesArray = []
      for (const aptitud of aptitudes_array) {
        if (aptitud.id == null) {
          const nueva = await this.prisma.aptitudes.create({
            data: {
              aprobado: false,
              aptitud: aptitud.aptitud
            }
          });
          
          aptitudesArray.push({ id: nueva.id, aptitud: nueva.aptitud });
        } else {
          const busqueda = await this.prisma.aptitudes.findFirst({
            where: {
              id: aptitud.id
            }
          })
          if (busqueda) {
            aptitudesArray.push({ id: busqueda.id, aptitud: busqueda.aptitud });
          }
        }
      }
      const id_aptitudes = aptitudesArray.map(palabra => palabra.id);
      const oferta = await this.prisma.ofertas.findFirst({ where: { id: oferta_id } })
      if (!oferta) {
        return formatResponseMessages(false, "La oferta_id no existe en la tabla OFERTAS", [])
      }

      const aptitudes = await this.prisma.aptitudes.findMany({
        where: {
          id: {
            in: id_aptitudes,
          },
        },
      });
      if (aptitudes.length !== id_aptitudes.length) {
        return formatResponseMessages(false, "El aptitud_id no existe en la tabla APTITUDES", []);
      }
      await this.prisma.aptitudes_oferta.deleteMany({
        where: {
          oferta_id: oferta_id
        }
      });
      const aptitud_oferta = id_aptitudes.map(aptitud => ({
        oferta_id: oferta_id,
        aptitud_id: aptitud
      }))
      const result = await this.prisma.aptitudes_oferta.createMany({
        data: aptitud_oferta,
        skipDuplicates: true
      })
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Agregamos varias aptitudes a una oferta ${name}`,
        accion: "createOrUpdateAptitudeOferta",
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
      const objeto = await this.prisma.aptitudes_oferta.findMany({
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
