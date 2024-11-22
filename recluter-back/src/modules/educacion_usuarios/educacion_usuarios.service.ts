import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateEducacionUsuarioDto, UpdateEducacionUsuarioDto, PaginationCentrosEducativosDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { Request } from 'express';
const name = "- EducacionUsuarios -"
@Injectable()
export class EducacionUsuariosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(EducacionUsuariosService.name)
  }
  async create(createEducacionUsuarioDto: CreateEducacionUsuarioDto, request: Request) {
    const { carrera, nombre_centro_educativo, carrera_id, centro_educativo_id, ...rest
    } = createEducacionUsuarioDto;

    let carreraNombre = carrera;
    let centroEducativoNombre = nombre_centro_educativo;

    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      if (carrera_id) {
        const carreraBusqueda = await this.findByIdCarrera(carrera_id);
        if (carreraBusqueda) {
          carreraNombre = carreraBusqueda.carrera;
        }
      }

      if (centro_educativo_id) {
        const centroBusqueda = await this.findByIdCentroEducativo(centro_educativo_id);
        if (centroBusqueda) {
          centroEducativoNombre = centroBusqueda.centro_educativo;
        }
      }

      const result = await this.prisma.educacion_usuarios.create({
        data: {
          carrera: carreraNombre,
          nombre_centro_educativo: centroEducativoNombre,
          usuario_id: +userId,
          carrera_id,
          centro_educativo_id,
          tipo_educacion_id: 1,
          ubicacion: rest.ubicacion,
          fecha_final: rest.fecha_final,
          fecha_inicio: rest.fecha_inicio,
          especialidad: rest.especialidad
          // ...rest
        }
      });
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
      return formatResponseMessages(true, "Operación Exitosa", [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  findAll() {
    return `This action returns all educacionUsuarios`;
  }

  async findByUserToken(request:Request) {

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const objeto = await this.prisma.educacion_usuarios.findMany({
        where: {
          usuario_id: +userId,
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

  
  async findByUser(id:number ) {
    try {
      const objeto = await this.prisma.educacion_usuarios.findMany({
        where: {
          usuario_id: id,
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

  async update(id: number, updateEducacionUsuarioDto: UpdateEducacionUsuarioDto, request: Request) {
    const { carrera, nombre_centro_educativo, fecha_final, fecha_inicio, tipo_educacion_id, carrera_id, centro_educativo_id  , ...rest} = updateEducacionUsuarioDto;

    let carreraNombre = carrera;
    let centroEducativoNombre = nombre_centro_educativo;

    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const busqueda = await this.findById(id)
      if (!busqueda) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }

      if (carrera_id) {
        const carreraBusqueda = await this.findByIdCarrera(carrera_id);
        if (carreraBusqueda) {
          carreraNombre = carreraBusqueda.carrera;
        }
      }

      if (centro_educativo_id) {
        const centroBusqueda = await this.findByIdCentroEducativo(centro_educativo_id);
        if (centroBusqueda) {
          centroEducativoNombre = centroBusqueda.centro_educativo;
        }
      }

      const result = await this.prisma.educacion_usuarios.update({
        where: { id },
        data: {
          carrera: carreraNombre,
          nombre_centro_educativo: centroEducativoNombre,
          fecha_final,
          fecha_inicio,
          tipo_educacion_id,
          usuario_id: userId,
          carrera_id,
          centro_educativo_id , 
          ...rest
        }
      });
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
      console.log(result, "result--mary")
      return formatResponseMessages(true, "Operación Exitosa", [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async remove(id: number, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.educacion_usuarios.delete({
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
    console.log(id, "---------------");
    try {
      const busqueda = await this.prisma.educacion_usuarios.findFirst({
        where: {
          id: 4
        }
      })
      /*       if (!busqueda) {
              throw new NotFoundException()
            } */
      return busqueda
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByIdCentroEducativo(id: number) {
    try {
      const busqueda = await this.prisma.centros_educativos.findFirst({
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
  async findByIdCarrera(id: number) {

    try {
      const busqueda = await this.prisma.carreras.findFirst({
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
