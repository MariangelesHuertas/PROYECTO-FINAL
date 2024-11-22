import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Put, HttpException, HttpStatus, Query } from '@nestjs/common';
import { PortafoliosUsuariosService } from './portafolios_usuarios.service';
import { UpdatePortafoliosUsuarioDto } from './dto/update-portafolios_usuario.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { portafolioUsuarioInterface } from './interface/portafolioUsuario.interface';
import { CreatePortafolioUsuarioDto } from './dto/create-portaflorios_usuario.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
import { PaginationPortafolioUsuarioDto } from './dto/paginate-portafolios-usuario.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
@ApiTags("Enpoints - Portafolios-usuarios")
@Controller('portafolios-usuarios')
export class PortafoliosUsuariosController {
  constructor(private readonly portafoliosUsuariosService: PortafoliosUsuariosService) { }

  @Post('uploadPortafolio')
  @ApiOperation({ summary: `Cargar un archivo, usar el form-data, nombre del campo de un archivo ->'archivoFile1', IMPORTANTE` })
  @ApiResponse({ status: 201, description: 'Devuelve un JSON con el objeto almacenado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'portafolioFile', maxCount: 1 },
      { name: 'archivoFile1', maxCount: 1 },
      { name: 'archivoFile2', maxCount: 1 },
      { name: 'archivoFile3', maxCount: 1 },
    ])
  )
  async uploadPortafolioFile(
    @UploadedFiles() archivos: { portafolioFile?: Express.Multer.File[], archivoFile1?: Express.Multer.File[], archivoFile2?: Express.Multer.File[], archivoFile3?: Express.Multer.File[] },
    @Body() createDto: CreatePortafolioUsuarioDto,
    @Req() request: Request
  ) {
    try {
      // Log para los archivos
      console.log('Backend -> Archivos recibidos:', archivos);
  
      // Log para el cuerpo de la petición
      console.log('Backend -> Datos recibidos:', createDto);
  
      const portafolioFile = archivos?.portafolioFile?.[0];
      const archivoFile1 = archivos?.archivoFile1?.[0];
      const archivoFile2 = archivos?.archivoFile2?.[0];
      const archivoFile3 = archivos?.archivoFile3?.[0];
  
      if (!portafolioFile) {
        throw new HttpException('No se ha proporcionado el archivo del portafolio principal', HttpStatus.BAD_REQUEST);
      }
  
      const portafolioUrl = await this.portafoliosUsuariosService.storePortafolio({
        nombre: portafolioFile.originalname.split('.').slice(0, -1).join('.'),
        archivo: portafolioFile,
      });
  
      const interfaceCsv: portafolioUsuarioInterface = {
        nombre: createDto.nombre,
        nombre_archivo: portafolioFile.originalname,
        portafolio: portafolioUrl,
        descripcion: createDto.descripcion,
        titulo: createDto.titulo,
        url: createDto.url,
        titulo1: archivoFile1 ? createDto.titulo1 || '' : '',
        titulo2: archivoFile2 ? createDto.titulo2 || '' : '',
        titulo3: archivoFile3 ? createDto.titulo3 || '' : '',
        archivoFile1: archivoFile1 || undefined,
        archivoFile2: archivoFile2 || undefined,
        archivoFile3: archivoFile3 || undefined,
      };
  
      // Llamar al servicio y pasar todos los archivos
      await this.portafoliosUsuariosService.uploadArchivoPortafolio(
        interfaceCsv, 
        createDto.softSkillsIds, 
        request, 
        { archivoFile1, archivoFile2, archivoFile3 }  // Aquí se pasa el objeto archivos
      );
  
      return {
        message: 'Portafolio y archivos subidos exitosamente',
        archivos: {
          archivoFile1: archivoFile1?.originalname || null,
          archivoFile2: archivoFile2?.originalname || null,
          archivoFile3: archivoFile3?.originalname || null,
        },
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Ocurrió un error al cargar el portafolio',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
   
  
 @Delete('deletePortafolio/:portafolioId')
  @ApiOperation({ summary: `Eliminar una archivo portafolio en base al id y el usuario_id` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  async deleteArchivoCsv(@Param('portafolioId') portafolioId: string, @Req() request: Request) {
    return this.portafoliosUsuariosService.deleteArchivoPortafolio(+portafolioId, request)
  }

  @Patch("changeDefaultPortafolio/:portafolioId")
  @ApiOperation({ summary: `Actualizamos el nuevo registro por default = true` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  async changeDefaultCsv(@Param('portafolioId') portafolioId: string, @Req() request: Request) {
    return this.portafoliosUsuariosService.changeDefaultCsv(+portafolioId, request)
  }


  @Get("findPortafolioUsuarioByToken")
  @ApiOperation({ summary: `Devuelve un array con los portafolio_usuarios , pasarle el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example: "nombre" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc', example: "asc" })
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'nombre_archivo', required: false, type: String, description: 'Busqueda por este campo' })
  async findPortafolioUsuarioByToken(@Req() request: Request, @Query() paginate: PaginationPortafolioUsuarioDto) {
    return this.portafoliosUsuariosService.findPortafolioUsuarioByToken(request, paginate)
  }

  @Get("findPortafolioUsuarioByUser/:userId")
  @ApiOperation({ summary: `Devuelve un array con los portafolio_usuarios` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto actualizado' })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página', example: 1 })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example: "carrera" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc', example: "asc" })
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'nombre_archivo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'userId', required: true, type: String, description: `Ingresa el ID del usuario` })
  async findPortafolioUsuarioByUser(@Param('userId') userId: string, @Query() paginate: PaginationPortafolioUsuarioDto) {
    return this.portafoliosUsuariosService.findPortafolioUsuarioByUser(+userId, paginate)
  }
}
