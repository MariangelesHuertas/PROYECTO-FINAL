import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PostulacionesService } from './postulaciones.service';
import { CreatePostulacioneDto } from './dto/create-postulacione.dto';
import { UpdatePostulacioneDto } from './dto/update-postulacione.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerPostulacioneDto } from './dto';
import { Request } from 'express';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { PaginationPostulacionDto } from './dto/paginate-postulaciones.dto';
import { FilterOferta } from './dto/filter-postulaciones.dto';
import { UpdateFasePosutlacionDto } from './dto/update-fase-postulacion.dto';

const name = "- Postulacion - "
@ApiTags("Endpoints - Postulaciones")
@Controller('postulaciones')
export class PostulacionesController {
  constructor(private readonly postulacionesService: PostulacionesService) {}

  @Post("createOrDelete")
  @ApiOperation({ summary: `Crear o elimina una  ${name} , pasarle el TOKEN` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerPostulacioneDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  createOrDelete(@Body() createPostulacioneDto: CreatePostulacioneDto, @Req() request: Request) {
    return this.postulacionesService.createOrDelete(createPostulacioneDto , request);
  }
  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerPostulacioneDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.postulacionesService.remove(+id , request);
  }

  @Get('getAllByUserToken')
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Postulaciones en base al token del USUARIO', type: [SwaggerPostulacioneDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })

  getAllByEmpresaId( @Query() paginate : PaginationPostulacionDto, @Req() request: Request) {
    return this.postulacionesService.getAllByUser(paginate , request);
  }



  @Get('findAllPostulacionesByOferta/:idOferta')
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Postulaciones en base al token del USUARIO', type: [SwaggerPostulacioneDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'apellido_paterno', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'apellido_materno', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'usuario', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'meses_experiencia', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubicacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'tipo_usuario', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordenamiento por field , usuario , ubicacion , cargo , meses_experiencia , createdAt , apellido_paterno , apellido_materno , nombre , tipo_usuario , sector' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordenamiento asc/desc' })
  @ApiParam({ name: 'idOferta', required: true, type: String, description: `Ingresa el ID ${name}` })

  findAllPostulaciones(@Param('idOferta') idOferta: string , @Query() paginate : PaginationPostulacionDto , @Body() filter:FilterOferta, @Req() request: Request) {
    return this.postulacionesService.findAllPostulacionesByOferta(+idOferta ,paginate , filter );
  }



  @Get('findAllLatestEmpresaByToken')
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Postulaciones en base al token del USUARIO', type: [SwaggerPostulacioneDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordenamiento por field , id ' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordenamiento asc/desc' })
  findAllLatestEmpresaByToken(@Query() paginate : PaginationPostulacionDto , @Req() request: Request) {
    return this.postulacionesService.findAllLatestEmpresaByToken( paginate , request );
  }


  @Patch('updateFasePostulacionNext/:id')
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Postulaciones en base al token del USUARIO', type: [SwaggerPostulacioneDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  updateFasePostulacionNext(@Param('id') id: string , @Body() update:UpdateFasePosutlacionDto) {
    return this.postulacionesService.updateFasePostulacionNext( +id  , update);
  }


  
}
