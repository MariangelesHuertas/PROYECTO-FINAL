import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { subMonths } from 'date-fns';
import { ParametrosAlertasOfertas } from './dto/parametros-alertas_ofertas.dto';

const name = "- AlertasOfertas -"
@Injectable()
export class AlertasOfertasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(AlertasOfertasService.name)
  }
  async relacionarAlertasOfertas(parametros:ParametrosAlertasOfertas,request: Request) {

    
    await this.prisma.alertas_ofertas.deleteMany();

    let { fecha_inicio, fecha_fin } = parametros;
    
    if (!fecha_inicio && !fecha_fin) {
      const hoy = new Date();
      const tresMeses = subMonths(hoy, 3);
    
      fecha_inicio = tresMeses.toISOString().split('T')[0];
      fecha_fin = hoy.toISOString().split('T')[0];
    }
    if(fecha_fin < fecha_inicio){
      return formatResponseMessages(true, 'la fecha de inicio es mayor a la fecha fin', []);

    }
    
    try {
      const alertas = await this.prisma.alertas.findMany({
        where: {
          activa: true,
          tipos_alertas: {
            tipo: 'Puesto de trabajo',
          },
          createdAt: {
            gte: new Date(fecha_inicio as string),
            lte: new Date(fecha_fin as string),
          },
        },
      });
      //console.log(alertas , "alertas ----", new Date(fecha_inicio as string))
      //console.log(alertas , "alertas ----", new Date(fecha_fin as string))
      const ofertas = await this.prisma.ofertas.findMany({
        where: {
          createdAt: {
            gte: new Date(fecha_inicio as string),
            lte: new Date(fecha_fin as string),
          },
        },
      });
      //console.log(ofertas , "ofertas ----")
      let resultados: any[] = [];
      const palabras = ["el", "la", "los", "las", "de", "del", "y", "o", "a", "un", "una", "por", "para", "con", "sin", "sobre", "entre"];

      for (const alerta of alertas) {
        let splitAlerta = alerta.cargo.split(' ').filter(palabra => !palabras.includes(palabra.toLocaleLowerCase()));

        for (const oferta of ofertas) {
          const match = splitAlerta.some(palabra => oferta.cargo.includes(palabra));

          if (match) {
            const result = await this.createAlertaOferta(alerta.id, oferta.id, request);
            resultados.push(result);
          }
        }
      }

      return formatResponseMessages(true, 'Operacion exitosa , se relaciono correctamente', resultados);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async createAlertaOferta(alerta_id: number, oferta_id: number, request: Request) {
    try {
      const result = await this.prisma.alertas_ofertas.create({
        data: {
          alerta_id: alerta_id,
          oferta_id: oferta_id
        }
      });
      return result;
    } catch (error) {
      console.log("error -2");

      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  /*   async create(createAlertasOfertaDto: CreateAlertasOfertaDto, request: Request) {
      const { alerta_id, oferta_id } = createAlertasOfertaDto
      try {
        const alerta = await this.vericacionTipoAlerta(alerta_id)
        if (alerta == null) {
          return formatResponseMessages(false, "alerta_id no tiene el tipo 'Puesto de trabajo' ", []);
        }
        const oferta = await this.busquedaOferta(oferta_id)
        if (oferta == null) {
          return formatResponseMessages(false, "no existe la oferta_id insertada en la tabla Oferta", []);
        }
        if (alerta.cargo === oferta.cargo) {
          const result = await this.createAlertaOferta(alerta.id, oferta.id, request)
  
          return formatResponseMessages(true, 'Operacion Exitosa 1 ', [result]);
        }
        let splitAlerta = alerta.cargo.split(' ');
        const match = splitAlerta.some(palabra => oferta.cargo.includes(palabra));
        if (match) {
          console.log(match, "----")
          const result = await this.createAlertaOferta(alerta.id, oferta.id, request)
  
          return formatResponseMessages(true, 'Operacion Exitosa 2 ', [result]);
        }
        return formatResponseMessages(true, 'Error - No hay coincidencia entre ambos cargos', []);
      } catch (error) {
        console.log("error -0")
  
        const message = this.databaseErrorService.handleDBErrorMessage(error);
        throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
      }
    } */
  /*   async vericacionTipoAlerta(id: number) {
      try {
        const result = await this.prisma.alertas.findUnique({
          where: { id: id },
          include: { tipos_alertas: true },
        });
        if (result == null) {
          return null
        }
        if (result.tipos_alertas.tipo == "Puesto de trabajo" && result.activa == true) {
          return result
        }
        return null
  
      } catch (error) {
        console.log("error -1")
        const message = this.databaseErrorService.handleDBErrorMessage(error);
        throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
      }
    }
    async busquedaOferta(id: number) {
      try {
        const result = await this.prisma.ofertas.findUnique({
          where: { id: id }
        });
        if (result) {
          return result
        }
        return null
      } catch (error) {
        console.log("error -2")
  
        const message = this.databaseErrorService.handleDBErrorMessage(error);
        throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
      }
    } */

  /*   async createAlertaOferta(alerta_id: number, oferta_id: number, request: Request) {
      try {
        const result = await this.prisma.alertas_ofertas.create({
          data: {
            alerta_id: alerta_id,
            oferta_id: oferta_id
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
        return result
      } catch (error) {
  
      }
    } */


  /*   findAll() {
      return `This action returns all alertasOfertas`;
    }
  
    findOne(id: number) {
      return `This action returns a #${id} alertasOferta`;
    }
  
    update(id: number, updateAlertasOfertaDto: UpdateAlertasOfertaDto) {
      return `This action updates a #${id} alertasOferta`;
    }
  
    remove(id: number) {
      return `This action removes a #${id} alertasOferta`;
    } */
}
