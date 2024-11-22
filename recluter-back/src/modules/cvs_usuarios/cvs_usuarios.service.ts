import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateCvsUsuarioDto } from './dto/update-cvs_usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { Request } from 'express';
import { promises as fs } from 'fs';
import { csvUsuarioInterface } from './interface/csvUsuario.interface';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { PaginationCvsUsuarioDto } from './dto/paginate-cvs-usuario.dto';
@Injectable()
export class CvsUsuariosService implements OnModuleInit {

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
    private configService: ConfigService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(CvsUsuariosService.name)
  }
  async storeCsv({ nombre, archivo }: { nombre: string; archivo: Express.Multer.File }): Promise<string> {
    const ruta = this.configService.get<string>('RUTA_CVS');
    const filePath = path.normalize(process.cwd() + ruta + nombre + path.extname(archivo.originalname));

    await fs.writeFile(filePath, archivo.buffer);
    const url = `${ruta}${nombre}${path.extname(archivo.originalname)}`;

    return url;
  }

  async uploadArchivoCsv(csvInterface: csvUsuarioInterface, request: Request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      let estado = false
      const count = await this.prisma.cvs_usuarios.count({
        where: {
          usuario_id: userId
        }
      })
      if (count == 0) {
        estado = true
      }
      const result = await this.prisma.cvs_usuarios.create({
        data: {
          usuario_id: userId,
          default: estado,
          ...csvInterface
        }
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

  async deleteArchivoCsv(id: number, request: Request) {
    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const result = await this.prisma.cvs_usuarios.delete({
        where: {
          id,
          usuario_id: userId
        }
      })

      const count = await this.prisma.cvs_usuarios.count({
        where: {
          default: true
        }
      })
      if (count == 0) {
        const firstRecord = await this.prisma.cvs_usuarios.findFirst({
          orderBy: {
            id: 'asc',
          },
        });

        if (firstRecord) {

          await this.prisma.cvs_usuarios.update({
            where: {
              id: firstRecord.id,
            },
            data: {
              default: true,
            },
          });
        }
      }

      return formatResponseMessages(true, 'Operacion Exitosa', [result]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async changeDefaultCsv(id: number, request) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])

      const changeDefault = await this.prisma.cvs_usuarios.updateMany({
        where: {
          usuario_id: userId
        },
        data: { default: false }
      })
      const result = await this.prisma.cvs_usuarios.update({
        where: {
          id,
          usuario_id: userId
        },
        data: { default: true }
      })
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);

    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findCVUsuarioByToken(request: Request, paginate: PaginationCvsUsuarioDto) {
    try {
      const { limit = 10, page = 1, nombre, nombre_archivo, sortColumn = "id", sortOrder = "asc" } = paginate;
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.cvs_usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: userId,
          ...(nombre ?
            {
              nombre: {
                contains: nombre
              }
            } : {}),
          ...(nombre_archivo ?
            {
              nombre_archivo: {
                contains: nombre_archivo
              }
            } : {})
        }
      })
      const total = await this.prisma.cvs_usuarios.count({
        where: {
          usuario_id: userId,
          ...(nombre ?
            {
              nombre: {
                contains: nombre
              }
            } : {}),
          ...(nombre_archivo ?
            {
              nombre_archivo: {
                contains: nombre_archivo
              }
            } : {})
        } , 
        orderBy
      })
      const meta = {
        ...paginate , 
        total
      }
      
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron cv_usuarios`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findCVUsuarioByUser(id: number, paginate: PaginationCvsUsuarioDto) {
    try {
      const { limit = 10, page = 1, nombre, nombre_archivo, sortColumn = "id", sortOrder = "asc" } = paginate;
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.cvs_usuarios.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          usuario_id: id,
          ...(nombre ?
            {
              nombre: {
                contains: nombre
              }
            } : {}),
          ...(nombre_archivo ?
            {
              nombre_archivo: {
                contains: nombre_archivo
              }
            } : {})
        } , 
        orderBy
      })
      const total = await this.prisma.cvs_usuarios.count({
        where: {
          usuario_id: id,
          ...(nombre ?
            {
              nombre: {
                contains: nombre
              }
            } : {}),
          ...(nombre_archivo ?
            {
              nombre_archivo: {
                contains: nombre_archivo
              }
            } : {})
        }
      })
      const meta = {
        ...paginate , 
        total
      }
      
      if (result.length === 0) {
        return formatResponseMessages(true, `No se encontraron cv_usuarios`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
}
