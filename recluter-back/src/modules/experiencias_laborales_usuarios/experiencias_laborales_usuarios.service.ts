import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateExperienciasLaboralesUsuarioDto } from './dto/create-experiencias_laborales_usuario.dto';
import { UpdateExperienciasLaboralesUsuarioDto } from './dto/update-experiencias_laborales_usuario.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
import { differenceInMonths } from 'date-fns';
const name = "- Experiencia_laborales_usuarios -"
@Injectable()
export class ExperienciasLaboralesUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(ExperienciasLaboralesUsuariosService.name)
  }
  async create(createExperienciasLaboralesUsuarioDto: CreateExperienciasLaboralesUsuarioDto,  request: Request) {
    const { empresa_id, nombre_empresa  , sector_id , nombre_sector ,fecha_fin , fecha_inicio , ...rest} = createExperienciasLaboralesUsuarioDto
    let empresaNombre = nombre_empresa;
    let sectorNombre = nombre_sector;
    try {
      const userId =await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (sector_id) {
        const searchSector = await this.findByIdSector(sector_id);
        if (searchSector) {
          sectorNombre = searchSector.sector; 
        }
      }
      if (empresa_id) {
        const searchEmpresa = await this.findByIdEmpresa(empresa_id);
        if (searchEmpresa) {
          empresaNombre = searchEmpresa.empresa; 
        }
      }

      const totalMeses = Math.abs(differenceInMonths(fecha_fin, fecha_inicio))
    
      const result = await this.prisma.experiencias_laborales_usuarios.create({
        data: {
          empresa_id, 
          usuario_id:userId, 
          nombre_empresa: empresaNombre , 
          sector_id , 
          nombre_sector:sectorNombre ,
          fecha_fin,
          fecha_inicio,
          ...rest,
          meses_experiencia:totalMeses
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
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findAllByUserToken(request:Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.experiencias_laborales_usuarios.findMany({
        where: { usuario_id: +userId }
      });
      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);;
    }
  }

  async findAllByUser(id:number) {
    try {
      const result = await this.prisma.experiencias_laborales_usuarios.findMany({
        where: { usuario_id: id }
      });
      if (!result) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró  ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', result);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);;
    }
  }

  async update(id: number, updateExperienciasLaboralesUsuarioDto: UpdateExperienciasLaboralesUsuarioDto,  request: Request) {
    const { empresa_id, sector_id,  fecha_fin, fecha_inicio, nombre_empresa  ,nombre_sector , ...rest } = updateExperienciasLaboralesUsuarioDto
    let empresaNombre = nombre_empresa;
    let sectorNombre = nombre_sector;
    try {

      const usuario_id = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (sector_id) {
        const searchSector = await this.findByIdSector(sector_id);
        if (searchSector) {
          
          sectorNombre = searchSector.sector;
        }
      }
      if (empresa_id) {
        const searchEmpresa = await this.findByIdEmpresa(empresa_id);
        if (searchEmpresa) {
          empresaNombre = searchEmpresa.empresa;
        }
      }

      const busqueda = await this.findById(id)
      if (!busqueda) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
      const result = await this.prisma.experiencias_laborales_usuarios.update({
        where:{
          id , 
          usuario_id:usuario_id
        },
        data:{
          empresa_id , sector_id , nombre_sector:sectorNombre , nombre_empresa:empresaNombre , fecha_fin , fecha_inicio , ...rest 
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
      return formatResponseMessages(true, 'Registro Actualizado', [result]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async remove(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = await this.findById(id)
      if (busqueda) {
        const result = await this.prisma.experiencias_laborales_usuarios.delete({
          where: { id, usuario_id: userId },
        })
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(""),
          jsonsalida: JSON.stringify(result),
          descripcion: `Eliminamos una ${name}`,
          accion: 1,
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
  async findById(id: number) {
    try {
      const busqueda = await this.prisma.experiencias_laborales_usuarios.findFirst({
        where: {
          id: id
        }
      })
      return busqueda
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findByIdEmpresa(id: number) {
    try {
      const busqueda = await this.prisma.empresas.findFirst({
        where: {
          id
        }
      })
      if (!busqueda) {
        throw new NotFoundException()
      }
      return busqueda
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findByIdSector(id: number) {

    try {
      const busqueda = await this.prisma.sectores.findFirst({
        where: {
          id
        }
      })
      if (!busqueda) {
        throw new NotFoundException()
      }
      return busqueda
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
