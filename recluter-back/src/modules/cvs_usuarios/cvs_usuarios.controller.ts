import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Put, HttpException, HttpStatus, Query } from '@nestjs/common';
import { CvsUsuariosService } from './cvs_usuarios.service';
import { UpdateCvsUsuarioDto } from './dto/update-cvs_usuario.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateCsvUsuarioDto } from './dto/create-csv-usuario.dto';
import { csvUsuarioInterface } from './interface/csvUsuario.interface';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { PaginationCvsUsuarioDto } from './dto/paginate-cvs-usuario.dto';

@ApiTags("Enpoints - CVS-usuarios")
@Controller('cvs-usuarios')
export class CvsUsuariosController {
  constructor(private readonly cvsUsuariosService: CvsUsuariosService) { }


  @Post('uploadCsv')
  @ApiOperation({summary: `Cargar un archivo, usar el form-data, nombre del campo ->'csvFile', IMPORTANTE`})
  @ApiResponse({status: 201,description: 'Devuelve un JSON con el objeto almacenado'})
  @UseInterceptors(
    FileFieldsInterceptor(
      [{ name: 'csvFile' }],
      {
        fileFilter: (req, file, callback) => {
          const allowedMimeTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
          if (!allowedMimeTypes.includes(file.mimetype)) {
            return callback(new HttpException('Solo se permiten archivos PDF o DOC', HttpStatus.BAD_REQUEST), false);
          }
          callback(null, true);
        }
      }
    )
  )
  async uploadCsvFile(
    @UploadedFiles() archivos: any,
    @Body() createDto: CreateCsvUsuarioDto,
    @Req() request: Request
  ) {
    try {
      const csvFile = archivos?.csvFile && archivos.csvFile.length > 0 ? archivos.csvFile[0] : null;
      if (!csvFile) {
        throw new HttpException('No se ha proporcionado ningún archivo o el tipo de archivo no es permitido', HttpStatus.BAD_REQUEST);
      }

      const sinExtension = csvFile.originalname.split('.').slice(0, -1).join('.');
      const csvUrl = await this.cvsUsuariosService.storeCsv({
        nombre: sinExtension,
        archivo: csvFile,
      });

      const interfaceCsv: csvUsuarioInterface = {
        nombre: createDto.nombre,
        nombre_archivo: csvFile.originalname,
        cv: csvUrl
      };

      await this.cvsUsuariosService.uploadArchivoCsv(interfaceCsv, request);

      return {
        message: 'Archivo cargado exitosamente',
        nombreArchivo: csvFile.originalname,
        urlArchivo: csvUrl,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Ocurrió un error al cargar el archivo',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  @Delete('deleteCsv/:csvId')
  @ApiOperation({ summary: `Eliminar una archivo csv en base al id y el usuario_id` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  async deleteArchivoCsv(@Param('csvId') csvId: string, @Req() request: Request) {
    return this.cvsUsuariosService.deleteArchivoCsv(+csvId, request)
  }

  @Patch("changeDefaultCsv/:csvId")
  @ApiOperation({ summary: `Actualizamos el nuevo registro por default = true` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  async changeDefaultCsv(@Param('csvId') csvId: string, @Req() request: Request) {
    return this.cvsUsuariosService.changeDefaultCsv(+csvId, request)
  }

  
  
  @Get("findCVUsuarioByToken")
  @ApiOperation({ summary: `Devuelve un array con los cv_usuarios , pasarle el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"carrera" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'nombre_archivo', required: false, type: String, description: 'Busqueda por este campo' })
  async findCVUsuarioByToken(@Req() request: Request , @Query() paginate:PaginationCvsUsuarioDto) {
    return this.cvsUsuariosService.findCVUsuarioByToken( request  , paginate)
  }

  @Get("findCVUsuarioByUser/:userId")
  @ApiOperation({ summary: `Devuelve un array con los cv_usuarios` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"carrera" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'nombre_archivo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'userId', required: true, type: String, description: `Ingresa el ID del usuario` })
  async findCVUsuarioByUser(@Param('userId') userId : string, @Query() paginate:PaginationCvsUsuarioDto) {
    return this.cvsUsuariosService.findCVUsuarioByUser( +userId  , paginate)
  }


}
