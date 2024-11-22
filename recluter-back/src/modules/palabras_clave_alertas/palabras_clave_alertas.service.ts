import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreatePalabrasClaveAlertaDto } from './dto/create-palabras_clave_alerta.dto';
import { UpdatePalabrasClaveAlertaDto } from './dto/update-palabras_clave_alerta.dto';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
const name = "- PalabrasClaveAlerta -"
@Injectable()
export class PalabrasClaveAlertasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PalabrasClaveAlertasService.name)
  }
  /* async createOrUpdate(createPalabrasClaveAlertaDto:CreatePalabrasClaveAlertaDto , request:Request){
    try {
      await this.prisma.palabras_clave_alerta.deleteMany({});
      const alertas = await this.prisma.alertas.findMany({
        where: {
          tipos_alertas: {
            tipo: 'Palabras clave',
          },
        },
        include: {
          palabras_clave_alerta: true,
        },
      }); */

     /*  for (const alerta of alertas) {
        const palabrasClave = alerta.palabras_clave_alerta.map(palabra => palabra.id);
        const ofertas = await this.prisma.ofertas.findMany({
          where: {
            palabras_clave_oferta: {
              some: {
                id: {
                  in: palabrasClave,
                },
              },
            },
          },
        });
        for (const oferta of ofertas) {
          const existeRelacion = await this.prisma.palabras_clave_alerta.findFirst({
            where: {
              alerta_id: alerta.id,
              oferta_id: oferta.id,
            },
          });

          if (!existeRelacion) {
            await this.prisma.palabras_clave_Alertas.create({
              data: {
                alerta_id: alerta.id,
                oferta_id: oferta.id,
              },
            });
          }
        }
      } */

  /*     return { success: true, message: 'Ofertas vinculadas correctamente por palabras clave' };
    } catch (error) {
      console.error('Error al vincular ofertas por palabras clave:', error);
      throw error; 
    }
  } */
  
  async createOrUpdate(palabraOferta: CreatePalabrasClaveAlertaDto ,  request: Request) {
    const { alerta_id, palabra_clave_id} = palabraOferta
    console.log(palabraOferta, "-------------")
    try {

      const oferta = await this.prisma.alertas.findFirst({ where: { id: alerta_id } })
      if (!oferta) {
        return formatResponseMessages(false, "La alerta_id no existe en la tabla ALERTA", [])
      }
      const skills = await this.prisma.palabras_claves.findMany({
        where: {
          id: {
            in: palabra_clave_id,
          },
        },
      });
      if (skills.length !== palabra_clave_id.length) {
        return formatResponseMessages(false, "Una palabra_clave id no existe en la tabla PALABRA-CLAVE-ID", []);
      }
      await this.prisma.palabras_clave_alerta.deleteMany({
        where: {
          alerta_id: alerta_id
        }
      });
      const palabraAlerta = palabra_clave_id.map(palabra => ({
        alerta_id: alerta_id,
        palabra_clave_id: palabra
      }))
      const result = await this.prisma.palabras_clave_alerta.createMany({
        data: palabraAlerta,
        skipDuplicates: true
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

  async getAllByAlerta(idAlerta:number){
    try {
      const objeto = await this.prisma.palabras_clave_alerta.findMany({
        where: {
          alerta_id: idAlerta,
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

/*   findAll() {
    return `This action returns all palabrasClaveAlertas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} palabrasClaveAlerta`;
  }

  update(id: number, updatePalabrasClaveAlertaDto: UpdatePalabrasClaveAlertaDto) {
    return `This action updates a #${id} palabrasClaveAlerta`;
  }

  remove(id: number) {
    return `This action removes a #${id} palabrasClaveAlerta`;
  } */
}
