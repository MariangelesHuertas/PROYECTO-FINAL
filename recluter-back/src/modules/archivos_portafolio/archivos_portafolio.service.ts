import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateArchivosPortafolioDto } from './dto/create-archivos_portafolio.dto';
import { UpdateArchivosPortafolioDto } from './dto/update-archivos_portafolio.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { DatabaseErrorService } from 'src/common/Error/database-error.service';
import { AuditoriasService } from '../auditorias/auditorias.service';
import { ConfigService } from '@nestjs/config';
import * as path from 'path';
import { Request } from 'express';

import { promises as fs } from 'fs';
import { archivosPortafolioInterface } from './interface/archivos_portafolio.interface';
import { formatResponseMessages } from 'src/common/Error/interfaces/response.interface';

@Injectable()
export class ArchivosPortafolioService  implements OnModuleInit{

  constructor(
    private readonly prisma: PrismaService,
    private readonly databaseErrorService: DatabaseErrorService,
    private readonly auditoriaService: AuditoriasService,
    private configService: ConfigService
  ) { }
  onModuleInit() {
    this.databaseErrorService.setLoggerContext(ArchivosPortafolioService.name)
  }

  async storeArchivo({ nombre, archivo }: { nombre: string; archivo: Express.Multer.File }): Promise<string> {
    const ruta = this.configService.get<string>('RUTA_ARCHIVOS');
    const filePath = path.normalize(process.cwd() + ruta + nombre + path.extname(archivo.originalname));

    await fs.writeFile(filePath, archivo.buffer);
    const url = `${ruta}${nombre}${path.extname(archivo.originalname)}`;

    return url;
  }
  async uploadArchivoPortafolio(archivoInterface: archivosPortafolioInterface, request: Request) {
    try {
      const result = await this.prisma.archivos_portafolio.create({
        data: {
          ...archivoInterface          
        }
      })
      return formatResponseMessages(true, "Operacion Exitosa", [result])
    } catch (error) {
      const message = this.databaseErrorService.handleDBErrorMessage(error);
      throw this.databaseErrorService.getExceptionBasedOnMessage(error, message);
    }

  }

}
