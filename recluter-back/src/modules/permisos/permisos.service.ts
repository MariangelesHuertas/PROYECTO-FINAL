import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TipoPermiso } from './interface/TipoPermiso.interface';
import { DatabaseErrorService } from '../../common/Error/database-error.service';

import { ResponseFormat, formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { UpdatePermisoDto, CreatePermisoDto, editPermiso, PaginationPermisoDto } from './dto';
import { Prisma } from '@prisma/client';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { Request } from 'express';
import { FilterFieldPermisosUsuarios } from './dto/filter-field.dto';
import { CreatePermisosUsuario } from './dto/create-permiso-usuarios.dto';
const name = "- Permiso -"
@Injectable()
export class PermisosService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PermisosService.name)
  }
  async create(createPermisoDto: CreatePermisoDto, request:Request): Promise<ResponseFormat> {
    try {

      const result = await this.prisma.permisos.create({
        data: {
          ...createPermisoDto,
        },
      });
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(result),
        jsonsalida: JSON.stringify(""),
        descripcion:`Creamos un ${name}`,
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

  async findAll(paginatePermiso: PaginationPermisoDto): Promise<ResponseFormat> {
    const { limit = 10, page = 1, slug, descripcion, sortColumn = "id", sortOrder = "asc" } = paginatePermiso;


    try {
      const where: any = {
        AND: [
          slug ? {
            permisos: {
              some: {
                slug: {
                  contains: slug,
                 // mode: 'insensitive',
                },
              },
            },
          } : undefined,
          descripcion ? {
            permisos: {
              some: {
                descripcion: {
                  contains: descripcion,
                  //mode: 'insensitive',
                },
              },
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const tiposPermisos = await this.prisma.tipos_permisos.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        include: {
          permisos: true,
        },
        orderBy
      });
      console.log("nada", tiposPermisos)
      const total = await this.prisma.tipos_permisos.count()
      const tipos: TipoPermiso[] = tiposPermisos.map(tipoPermiso => ({
        id_tipo_permiso: tipoPermiso.id,
        tipo_permiso: tipoPermiso.tipo,
        permisos: tipoPermiso.permisos.map(permiso => ({
          id: permiso.id,
          descripcion: permiso.descripcion,
          slug: permiso.slug,
        })),
      }));
      if (tipos.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        slug: slug,
        total,
        descripcion: descripcion,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', tipos, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findOne(id: number): Promise<ResponseFormat> {
    try {
      const busqueda = await this.prisma.permisos.findFirst({
        where: { id: id }
      });
      if (!busqueda) {
        throw new NotFoundException(formatResponseMessages(false, `No se encontró el ${name} con el ID proporcionado`, []));
      }
      return formatResponseMessages(true, 'Operación exitosa', [busqueda]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }
/* 
  async update(id: number, updatePermisoDto: UpdatePermisoDto, request:Request) {
    try {
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.permisos.update({
          where: { id },
          data: { ...updatePermisoDto },
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
        return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }



    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);

    }
  } */

  remove(id: number) {
    return `This action removes a #${id} permiso`;
  }

  async editPermiso(editPermiso: editPermiso, request:Request) {
    try {
      const result = await this.prisma.permisos.update({
        where: { id: editPermiso.id },
        data: {
          tipo_permiso_id: editPermiso.tipo_permiso_id,
        },
      });
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(""),
        jsonsalida: JSON.stringify(result),
        descripcion: `editamos un Permiso una ${name}`,
        accion: 2,
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
  async findById(id: number) {
    try {
      const busqueda = await this.prisma.permisos.findFirst({
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

  async findAllUsuarioPermisos(ids: number, param: FilterFieldPermisosUsuarios) {
    const { sortColumn, sortOrder, search } = param

    try {
      const tipos_permiso = await this.prisma.tipos_permisos.findMany({
        include: {
          permisos: {
            select: {
              id: true,
              descripcion: true
            }
          }
        }
      })
      const permisos = await this.prisma.permisos.findMany()
      const busquedaPermiso = await this.prisma.permisos_tipos_usuarios.findMany({
        where: { tipo_usuario_id: ids },
        include: {
          permisos: {
            select: {
              id: true,
            },
          },
        },
      });
      let agrupamiento = tipos_permiso.map(tipo => (
        {
          id: tipo.id,
          tipo_permiso: tipo.tipo,
          permisos: []
        }
      ))
      permisos.map(permiso => {
        const busqueda = agrupamiento.find(agrup => agrup.id === permiso.tipo_permiso_id)
        if (busqueda) {
          busqueda.permisos.push({
            id: permiso.id,
            permiso: permiso.descripcion,
            seleccionado: false,
            busqueda: busqueda.id

          })
        }
      })
      agrupamiento.map((agrup) => {
        agrup.permisos = tipos_permiso
          .filter((tipo) => tipo.id === agrup.id)
          .flatMap((tipo) => tipo.permisos.map((perm) => {
            const permisoExistente = busquedaPermiso.some((bus) => bus.permisos.id === perm.id);

            return {
              id: perm.id,
              permiso: perm.descripcion,
              seleccionado: permisoExistente,
            };
          }));
      });
      // agrupamiento = agrupamiento.map(agrup => ({
      //   ...agrup,
      //   permisos: agrup.permisos.filter(perm => {
      //     const tipoPermiso = agrup.tipo_permiso.toLowerCase();
      //     const descripcionPermiso = perm.permiso.toLowerCase();
      //     const terminoBusqueda = search?.toLowerCase() || '';

      //     return (
      //       tipoPermiso.includes(terminoBusqueda) ||
      //       descripcionPermiso.includes(terminoBusqueda)
      //     );
      //   })
      // })).filter(agrup => agrup.permisos.length > 0);
      // agrupamiento.forEach(agrup => {
      //   agrup.permisos.sort((a, b) => {
      //     let campoA, campoB;
      //     if (sortColumn === 'tipo_permiso') {
      //       campoA = agrup.tipo_permiso;
      //       campoB = agrup.tipo_permiso;
      //     } else {
      //       campoA = a.permiso;
      //       campoB = b.permiso;
      //     }

      //     if (campoA < campoB) return sortOrder === 'asc' ? -1 : 1;
      //     if (campoA > campoB) return sortOrder === 'asc' ? 1 : -1;
      //     return 0;
      //   });
      // });
      return formatResponseMessages(true, 'Operación Exitosa', agrupamiento);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async createOrUpdatePermisosUsuario(create: CreatePermisosUsuario, request:Request) {
    const { permiso_id , tipo_usuario_id } = create
    try {
      const tipo_usuario = await this.prisma.tipos_usuarios.findFirst({ where: { id: tipo_usuario_id } })
      if (!tipo_usuario) {
        return formatResponseMessages(false, "La tipo_usuario no existe en la tabla TIPO_USUARIO", [])
      }
      const permisos = await this.prisma.permisos.findMany({
        where: {
          id: {
            in: permiso_id,
          },
        },
      });
      if (permisos.length !== permiso_id.length) {
        return formatResponseMessages(false, "Un permiso_id no existe en la tabla PERMISOS", []);
      }
      await this.prisma.permisos_tipos_usuarios.deleteMany({
        where: {
          tipo_usuario_id: tipo_usuario_id
        }
      });
      const permisoUsuario = permiso_id.map(permiso => ({
        tipo_usuario_id: tipo_usuario_id,
        permiso_id: permiso
      }))
      const result = await this.prisma.permisos_tipos_usuarios.createMany({
        data: permisoUsuario,
        skipDuplicates: true
      })
      const envio: AuditoriaInterfaz = {
        tipo_auditoria_id: 1,
        user_token: request['authAuthorization'],
        ip: request['ipAddress'],
        jsonentrada: JSON.stringify(""),
        jsonsalida: JSON.stringify(result),
        descripcion: `Crear o actualizar los permisos de un tipo_ususario ${name}`,
        accion: "CreateOrUpdate",
        ruta: request.url,
        log: "",
        tabla: `${name}`,
        pk_actualizado: 0
      }
      this.auditoriaService.logAuditoria(envio)
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  } 
    

}

