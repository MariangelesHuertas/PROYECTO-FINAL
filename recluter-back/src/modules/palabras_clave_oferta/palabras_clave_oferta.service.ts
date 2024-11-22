import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePalabrasClaveOfertaDto, PalabraClaveArray } from './dto/create-palabras_clave_oferta.dto';
import { UpdatePalabrasClaveOfertaDto } from './dto/update-palabras_clave_oferta.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { PalabrasClaveService } from '../palabras_clave/palabras_clave.service';
const name = "- PalabrasClaveOferta -"
@Injectable()
export class PalabrasClaveOfertaService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,

  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PalabrasClaveOfertaService.name)
  }
  async createOrUpdatePalabraOferta(palabraOferta: CreatePalabrasClaveOfertaDto, request: Request) {
    const { oferta_id, palabras_claves } = palabraOferta
    try {
      let palabrasArray = []
      for (const palabra of palabras_claves) {
        if (palabra.id == null) {
          const nueva = await this.prisma.palabras_claves.create({
            data: {
              aprobado: false,
              palabra: palabra.palabra_clave
            }
          });
          palabrasArray.push({ id: nueva.id, palabra: nueva.palabra });
        } else {
          const busqueda = await this.prisma.palabras_claves.findFirst({
            where: {
              id: palabra.id
            }
          })
          if (busqueda) {
            palabrasArray.push({ id: busqueda.id, palabra: busqueda.palabra });
          }
        }
      }
      const id_palabras_clave = palabrasArray.map(palabra => palabra.id);
      const oferta = await this.prisma.ofertas.findFirst({ where: { id: oferta_id } })
      if (!oferta) {
        return formatResponseMessages(false, "La oferta_id no existe en la tabla OFERTAS", [])
      }
      const palabras_clave = await this.prisma.palabras_claves.findMany({
        where: {
          id: {
            in: id_palabras_clave,
          },
        },
      });
      if (palabras_clave.length !== id_palabras_clave.length) {
        return formatResponseMessages(false, "Una palabra_clave id no existe en la tabla PALABRA-CLAVE-ID", []);
      }
      await this.prisma.palabras_clave_oferta.deleteMany({
        where: {
          oferta_id: oferta_id
        }
      });
      const palabraOferta = id_palabras_clave.map(palabra => ({
        oferta_id: oferta_id,
        palabra_clave_id: palabra
      }))
      const result = await this.prisma.palabras_clave_oferta.createMany({
        data: palabraOferta,
        skipDuplicates: true
      })
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion: `Creamos una ${name}`,
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
  async getAllByOferta(idOferta: number) {
    try {
      const objeto = await this.prisma.palabras_clave_oferta.findMany({
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
