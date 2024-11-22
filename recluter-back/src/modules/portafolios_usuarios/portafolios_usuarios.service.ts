import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdatePortafoliosUsuarioDto } from './dto/update-portafolios_usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { Request } from 'express';

import { promises as fs } from 'fs';
import { portafolioUsuarioInterface } from './interface/portafolioUsuario.interface';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';
import { PaginationPortafolioUsuarioDto } from './dto/paginate-portafolios-usuario.dto';
@Injectable()
export class PortafoliosUsuariosService implements OnModuleInit{

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
    private configService: ConfigService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(PortafoliosUsuariosService.name)
  }
  async storePortafolio({ nombre, archivo }: { nombre: string; archivo: Express.Multer.File }): Promise<string> {
    const ruta = this.configService.get<string>('RUTA_PORTAFOLIO');
    const filePath = path.normalize(process.cwd() + ruta + nombre + path.extname(archivo.originalname));

    await fs.writeFile(filePath, archivo.buffer);

    //const baseUrl = this.configService.get<string>('URL') || 'http://localhost:3005';
    const url = `${ruta}${nombre}${path.extname(archivo.originalname)}`;

    return url;
  }

  async uploadArchivoPortafolio(
    csvInterface: portafolioUsuarioInterface, softSkillsIds: number[], request: Request, archivos: { archivoFile1?: Express.Multer.File, archivoFile2?: Express.Multer.File, archivoFile3?: Express.Multer.File }
  ) {
    try {
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization']);
  
      let estado = false;
      const count = await this.prisma.portafolios_usuario.count({
        where: { usuario_id: userId }
      });
      if (count === 0) {
        estado = true;
      }
  
      // Crear el registro del portafolio
      const portafolio = await this.prisma.portafolios_usuario.create({
        data: {
          usuario_id: userId,
          default: estado,
          nombre: csvInterface.nombre,
          nombre_archivo: csvInterface.nombre_archivo,
          portafolio: csvInterface.portafolio,
          descripcion: csvInterface.descripcion,
          titulo: csvInterface.titulo,
          url: csvInterface.url,
        }
      });
  
      // Procesar softSkills
      await Promise.all(softSkillsIds.map(async (softSkillId) => {
        await this.prisma.soft_skills_portafolio.create({
          data: {
            portafolio_usuario_id: portafolio.id,
            soft_skill_id: softSkillId
          }
        });
      }));
  
      // Procesar los archivos de manera opcional junto con los títulos opcionales
      const archivosDetalles = [
        { file: archivos.archivoFile1, titulo: csvInterface.titulo1 },
        { file: archivos.archivoFile2, titulo: csvInterface.titulo2 },
        { file: archivos.archivoFile3, titulo: csvInterface.titulo3 },
      ];
  
      for (const { file, titulo } of archivosDetalles) {
        if (file) {
          const sinExtension = file.originalname.split('.').slice(0, -1).join('.');
          const archivoUrl = await this.storePortafolio({
            nombre: sinExtension,
            archivo: file,
          });
  
          await this.prisma.archivos_portafolio.create({
            data: {
              portafolio_usuario_id: portafolio.id,
              titulo: titulo,
              nombre_archivo: file.originalname,
              archivo: archivoUrl,
            }
          });
        }
      }
  
      return formatResponseMessages(true, "Operación Exitosa", [portafolio]);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }
  


  async deleteArchivoPortafolio(id: number, request: Request) {
    try {

      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const result = await this.prisma.portafolios_usuario.delete({
        where: {
          id,
          usuario_id: userId
        }
      })
      const count = await this.prisma.portafolios_usuario.count({
        where: {
          default: true
        }
      })
      if (count == 0) {
        const firstRecord = await this.prisma.portafolios_usuario.findFirst({
          orderBy: {
            id: 'asc',
          },
        });

        if (firstRecord) {

          await this.prisma.portafolios_usuario.update({
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
      
      const changeDefault = await this.prisma.portafolios_usuario.updateMany({
        where:{
          usuario_id:userId
        },
        data:{default:false}
      })
      const result = await this.prisma.portafolios_usuario.update({
        where:{
          id,
          usuario_id:userId
        },
        data:{default:true}
      })
      return formatResponseMessages(true, 'Operacion Exitosa', [result]);
      
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findPortafolioUsuarioByToken(request: Request, paginate: PaginationPortafolioUsuarioDto) {
    try {
      const { limit = 10, page = 1, nombre, nombre_archivo, sortColumn = "id", sortOrder = "asc" } = paginate;
      const userId = await this.auditoriaService.getUserIdByToken(request['authAuthorization'])
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.portafolios_usuario.findMany({
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
        },
        include: {
          soft_skills_portafolio: {
            include: {
              soft_skills: true
            }
          },
          archivos_portafolio: true
        },

      })
      const total = await this.prisma.portafolios_usuario.count({
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
        return formatResponseMessages(true, `No se encontraron portafolios_usuario`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

  async findPortafolioUsuarioByUser(id: number, paginate: PaginationPortafolioUsuarioDto) {
    try {
      const { limit = 10, page = 1, nombre, nombre_archivo, sortColumn = "id", sortOrder = "asc" } = paginate;
      const orderBy: { [key: string]: string } = {};
      orderBy[sortColumn] = sortOrder;
      const result = await this.prisma.portafolios_usuario.findMany({
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
      const total = await this.prisma.portafolios_usuario.count({
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
        return formatResponseMessages(true, `No se encontraron portafolios_usuario`, []);
      }
      return formatResponseMessages(true, 'Operacion Exitosa', result, null, meta);
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }
  }

}
