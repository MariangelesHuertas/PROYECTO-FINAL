import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateEmpresasSeguidaDto } from './dto/create-empresas_seguida.dto';
import { UpdateEmpresasSeguidaDto } from './dto/update-empresas_seguida.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';

import { Request } from 'express';
const name = "- Empresa_seguida -"
@Injectable()
export class EmpresasSeguidasService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(EmpresasSeguidasService.name)
  }
  async create(createDto: CreateEmpresasSeguidaDto ,  request:Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      let deleteCreate
      let estado = 1
      if(await this.busquedaEmpresaSeguida(userId , createDto.empresa_id)){
        deleteCreate =await this.prisma.empresa_seguida.delete({
          where: {
            usuario_id_empresa_id: {
              usuario_id: userId,
              empresa_id: createDto.empresa_id,
            },
          },
        });
        estado = 3
      }else{
        deleteCreate = await this.prisma.empresa_seguida.create({
          data:{
            usuario_id:userId , 
            empresa_id:createDto.empresa_id
          }
        })
        estado = 1
      }
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(estado ? deleteCreate: ""),
        jsonsalida: JSON.stringify( estado ? "": deleteCreate),
        descripcion: `  ${ estado == 1 ? "Creamos una " : "Eliminamos una "} ${ name}`,
        accion: estado,
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: deleteCreate.id
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, `${ estado == 1 ? "Creamos una " : "Eliminamos una "} ${ name}`, [deleteCreate]);
      
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async busquedaEmpresaSeguida (id_usuario:number , id_empresa:number){
    try {
      const result = await this.prisma.empresa_seguida.findFirst({
        where:{
          usuario_id:id_usuario , 
          empresa_id :id_empresa
        }
      })
      return result !== null;
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findAllSeguidosByUser (request:Request){
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.empresa_seguida.findMany({
        where:{
          usuario_id:userId
        }
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
