import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateTipoPermisoDto } from './dto/create-tipo_permiso.dto';
import { UpdateTipoPermisoDto } from './dto/update-tipo_permiso.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { PaginationTipoPermisoDto } from './dto/pagination-tipo_Permiso.dto';
import { AuditoriaInterfaz } from '../../modules/auditorias/interface/auditorias.interface';
import { AuditoriasService } from '../../modules/auditorias/auditorias.service';
import { Request } from 'express';
const name = "- TipoPermisos -"
@Injectable()
export class TipoPermisosService implements OnModuleInit {
  constructor(
    private prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(TipoPermisosService.name)
  }

  async create(createTipoPermisoDto: CreateTipoPermisoDto, request: Request) {
    try {
      const result = await this.prisma.tipos_permisos.create({
        data: {
          ...createTipoPermisoDto
        },
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
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

  async findAll(paginationTipoPermiso: PaginationTipoPermisoDto) {
    const { limit = 10, page = 1, tipo, sortColumn = "id", sortOrder = "asc" } = paginationTipoPermiso;
    try {
      const where: any = {
        AND: [
          tipo ? {
            tipo: {
              contains: tipo,
             // mode: 'insensitive',
            },
          } : undefined,
        ].filter(Boolean),
      };
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const permisos = await this.prisma.tipos_permisos.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where,
        orderBy
      });
      const total = await this.prisma.tipos_permisos.count()
      if (permisos.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      const meta = {
        limit: limit,
        page: page,
        tipo: tipo,
        total,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      return formatResponseMessages(true, 'Operacion Exitosa', permisos, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

/*   findOne(id: number) {
    return `This action returns a #${id} tipoPermiso`;
  }
 */
  async update(id: number, updateTipoPermisoDto: UpdateTipoPermisoDto, request: Request) {
    try {
      const busqueda = this.findById(id)
      if (busqueda) {
        const result = await this.prisma.tipos_permisos.update({
          where: { id },
          data: {
            tipo: updateTipoPermisoDto.tipo
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
  /* remove(id: number) {
    return `This action removes a #${id} tipoPermiso`;
  } */
  async findById(id: number) {
    try {
      const busqueda = await this.prisma.tipos_permisos.findFirst({
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
