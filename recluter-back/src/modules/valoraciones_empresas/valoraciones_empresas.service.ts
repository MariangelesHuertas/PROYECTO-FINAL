import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateValoracionesEmpresaDto } from './dto/create-valoraciones_empresa.dto';
import { UpdateValoracionesEmpresaDto } from './dto/update-valoraciones_empresa.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { AuditoriaInterfaz } from '../auditorias/interface/auditorias.interface';
import { PaginationValoracionesEmpresasDto } from './dto/paginate-valoraciones_empresas.dto';
import { ValoracionStatsDto } from './dto/valoracion.dto';
import { Decimal } from '@prisma/client/runtime/library';
const name = "- ValoracionesEmpresa -"
@Injectable()
export class ValoracionesEmpresasService implements OnModuleInit {
  valoracionesEmpresasService: any;
  findByEmpresa(arg0: number) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(ValoracionesEmpresasService.name)
  }
  async createOrUpdate(createValoracionesEmpresaDto: CreateValoracionesEmpresaDto, request: Request) {
    const { link_valoracion, ...rest } = createValoracionesEmpresaDto
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const searchLink = await this.prisma.usuarios.findUnique({
        where:{
          link_valoracion
        }
      })
      const searchEmpresa = await this.prisma.empresas.findFirst({
        where:{
          usuario_id:searchLink.id
        }
      })
      if(!searchEmpresa){
        return formatResponseMessages(true, "El usuario no tiene empresas registradas")
      }
      if (await this.busquedaUsuario(userId) && await this.busquedaEmpresa(searchEmpresa.id)) {

        const searchUserEmpre = await this.busquedaUsuarioEmpresa(userId, searchEmpresa.id)

        let result
        if (searchUserEmpre) {
          result = await this.prisma.valoraciones_empresas.update({
            where: {
              usuario_id_empresa_id: {
                usuario_id: userId,
                empresa_id: searchEmpresa.id,
              },
            },
            data: {
              ...rest
            },
          });
        } else {
          result = await this.prisma.valoraciones_empresas.create({
            data: {
              usuario_id: userId,
              empresa_id: searchEmpresa.id,
              ...rest , 
              
            }
          })
        }
        const envio: AuditoriaInterfaz = {
          tipo_auditoria_id: 1,
          user_token: request['authAuthorization'],
          ip: request['ipAddress'],
          jsonentrada: JSON.stringify(result),
          jsonsalida: JSON.stringify(""),
          descripcion: `Creamos  o actualizamos una ${name}`,
          accion: "createOrUpdate",
          ruta: request.url,
          log: "",
          tabla: `${name}`,
          pk_actualizado: result.id
        }
        this.auditoriaService.logAuditoria(envio)
        return formatResponseMessages(true, "Operacion Exitosa", [result])
      } else {
        throw new NotFoundException(formatResponseMessages(false, `No se encontro el registro ${name}`, []))
      }
    } catch (error) {
      console.log("entro error")
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
 
  async busquedaUsuarioEmpresa(usuario_id: number, empresa_id: number) {
    try {
      const resultado = await this.prisma.valoraciones_empresas.findFirst({
        where: {
          usuario_id: usuario_id,
          empresa_id: empresa_id
        }
      })
      return resultado
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }


  }
  async busquedaUsuario(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.usuarios.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async busquedaEmpresa(id: number): Promise<boolean> {
    try {
      const busqueda = await this.prisma.empresas.findFirst({ where: { id: id } })
      return busqueda != null
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }


  async findByUser(id: number , paginate:PaginationValoracionesEmpresasDto) {
    const { limit = 10, page = 1, observacion , valoracion, sortColumn = "id", sortOrder = "asc" } = paginate;
    try {

      const where:any = {
        AND:[
          observacion !== undefined ? {
            observacion:{
              contains:observacion
            }
          } : undefined,
          valoracion !== undefined ? {
            valoracion:{
              equals:valoracion
            }
          } : undefined,
        ].filter(Boolean)
      }
      const result = await this.prisma.valoraciones_empresas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: id,
          ...where
        },
        select: {
          id: true,
          observacion: true,
          valoracion: true,
          createdAt: true,
          usuarios: {
            select: {
              imagen: true,
              cargo: true,
              personas: {
                select: {
                  apellido_materno: true,
                  apellido_paterno: true,
                  nombre: true,
                }

              }
            },

          },

        }
      })
      const total = await this.prisma.valoraciones_empresas.count({ where: {
        usuario_id: id,
        ...where
      },})
      const meta = {
        limit: limit,
        page: page,
        total,observacion , valoracion,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }
      
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findByToken(request: Request , paginate:PaginationValoracionesEmpresasDto) {

    const { limit = 10, page = 1, observacion , valoracion, sortColumn = "id", sortOrder = "asc" } = paginate;
    const where:any = {
      AND:[
        observacion !== undefined ? {
          observacion:{
            contains:observacion
          }
        } : undefined,
        valoracion !== undefined ? {
          valoracion:{
            equals:valoracion
          }
        } : undefined,
      ].filter(Boolean)
    }
    try {
      const empresaId = (await this.findEmpresa(request)).data?.[0].id;
      const result = await this.prisma.valoraciones_empresas.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { empresa_id: empresaId  , ...where},
        select: {
          id: true,
          observacion: true,
          valoracion: true,
          createdAt: true,
          usuarios: {
            select: {
              imagen: true,
              cargo: true,
              personas: {
                select: {
                  apellido_materno: true,
                  apellido_paterno: true,
                  nombre: true,
                }

              }
            },
          },
        }
      })
      const total = await this.prisma.valoraciones_empresas.count({  where: { empresa_id: empresaId  , ...where}})
      const meta = {
        limit: limit,
        page: page,
        total,observacion , valoracion,
        sortColumn: sortColumn,
        sortOrder: sortOrder
      }  
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron ${name}`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  async findEmpresa(request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.empresas.findMany({
        where: {
          usuario_id: userId
        }
      })
      if (result === null) {
        return formatResponseMessages(true, "No hay empresas para este usuario", [])
      }
      return formatResponseMessages(true, "Operacion Exitosa", [result])

    } catch (error) {
      console.log("entro al error")
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async getEmpresaStats(request: Request, empresaId: number) {
    try {
      const valoraciones = await this.prisma.valoraciones_empresas.findMany({
        where: { 
          empresa_id: empresaId,
        }
      });
  
      const stats: ValoracionStatsDto[] = [
        { valoracion: 1, porcentaje: 0, cantidadUsuarios: 0 },
        { valoracion: 2, porcentaje: 0, cantidadUsuarios: 0 },
        { valoracion: 3, porcentaje: 0, cantidadUsuarios: 0 },
        { valoracion: 4, porcentaje: 0, cantidadUsuarios: 0 },
        { valoracion: 5, porcentaje: 0, cantidadUsuarios: 0 }
      ];
  
      valoraciones.forEach(v => {
        const valoracionNumber = this.decimalToNumber(v.valoracion);
        const index = Math.floor(valoracionNumber) - 1;
        if (index >= 0 && index < 5) {
          stats[index].cantidadUsuarios++;
        }
      });
  
      const totalValoraciones = valoraciones.length;
      stats.forEach(s => {
        s.porcentaje = Number((s.cantidadUsuarios / totalValoraciones * 100).toFixed(2)) || 0;
      });
  
      // Calcular el promedio de valoración
      const sumValoraciones = valoraciones.reduce((sum, v) => sum + this.decimalToNumber(v.valoracion), 0);
      const promedioValoracion = sumValoraciones / totalValoraciones;
  
      // return [
      //   ...stats,
      //   { promedioValoracion: promedioValoracion }
      // ];
      return {
        promedioValoracion: promedioValoracion, 
        "stats": [...stats]
      };
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  
  private decimalToNumber(decimal: Decimal): number {
    return decimal.toNumber();
  }
}
