import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFiles, Req, HttpException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ArchivosPortafolioService } from './archivos_portafolio.service';
import { CreateArchivosPortafolioDto } from './dto/create-archivos_portafolio.dto';
import { UpdateArchivosPortafolioDto } from './dto/update-archivos_portafolio.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { archivosPortafolioInterface } from './interface/archivos_portafolio.interface';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
@Controller('archivos-portafolio')
export class ArchivosPortafolioController {
  constructor(private readonly archivosPortafolioService: ArchivosPortafolioService) {}

  @Post('uploadPortafolio')
  @ApiOperation({summary: `Cargar un archivo, usar el form-data, nombre del campo ->'archivoFile', IMPORTANTE`})
  @ApiResponse({status: 201,description: 'Devuelve un JSON con el objeto almacenado'})
  @ApiResponse({status: 400,description: 'Error al hacer la consulta',type: SwaggerResponseFormatDto})
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'archivoFile' }], 
      {
        fileFilter: (req, file, callback) => {
          callback(null, true);
        }
      }
    )
  )
  async uploadPortafolioFile(
    @UploadedFiles() archivos: any,
    @Body() createDto: CreateArchivosPortafolioDto,
    @Req() request: Request
  ) {
    try {
      const archivoFile = archivos?.archivoFile && archivos.archivoFile.length > 0 ? archivos.archivoFile[0] : null;
      if (!archivoFile) {
        throw new HttpException('No se ha proporcionado ningún archivo de portafolio', HttpStatus.BAD_REQUEST);
      }

      const sinExtension = archivoFile.originalname.split('.').slice(0, -1).join('.');
      const portafolioUrl = await this.archivosPortafolioService.storeArchivo({
        nombre: sinExtension,
        archivo: archivoFile,
      });

      const interfaceCsv: archivosPortafolioInterface = {
        titulo: createDto.titulo,
        nombre_archivo: archivoFile.originalname,
        archivo: portafolioUrl , 
        portafolio_usuario_id : +createDto.portafolio_usuario_id
      };

      await this.archivosPortafolioService.uploadArchivoPortafolio(interfaceCsv, request);

      return {
        message: 'Archivo de portafolio cargado exitosamente',
        nombreArchivo: archivoFile.originalname,
        urlArchivo: portafolioUrl,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Ocurrió un error al cargar el archivo de portafolio',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
 
}
