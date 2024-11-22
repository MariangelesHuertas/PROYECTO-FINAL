import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, Req, BadRequestException } from '@nestjs/common';
import { TipoPermisosService } from './tipo_permisos.service';
import { CreateTipoPermisoDto } from './dto/create-tipo_permiso.dto';
import { UpdateTipoPermisoDto } from './dto/update-tipo_permiso.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerPermisoDto } from './dto/swagger-permiso.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { PaginationTipoPermisoDto } from './dto/pagination-tipo_Permiso.dto';
import { Request } from 'express';


const name = "- TipoPermisos - "
@ApiTags('Endpoints - Tipo Permisos')
@Controller('tipo-permisos')
export class TipoPermisosController {
  constructor(private readonly tipoPermisosService: TipoPermisosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Tipo de Permiso2' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado' , type:SwaggerPermisoDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error'  , type:SwaggerResponseFormatDto})
  create(@Body() createTipoPermisoDto: CreateTipoPermisoDto, @Req() request: Request) {
    return this.tipoPermisosService.create(createTipoPermisoDto, request);
  }

  @Get()
  @ApiOperation({ summary: 'Devuelve una lista de Permisos' })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Permisos', type: [SwaggerPermisoDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type:String, description: 'Ordena por columna  - tipo/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'tipo', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginationTipoPermiso:PaginationTipoPermisoDto) {
    return this.tipoPermisosService.findAll(paginationTipoPermiso);
  }

 /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoPermisosService.findOne(+id);
  } */

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un Tipo de Permiso' })
  @ApiResponse({ status: 200, description: 'Devuelve un json con el objeto actualizado' , type:SwaggerPermisoDto })
  @ApiResponse({ status: 400, description: 'Error al actualizar'  , type:SwaggerResponseFormatDto})
  @ApiParam({name:"id" , required:true ,description: "Id del Tipo_Permiso"})
  update(@Param('id') id: string, @Body() updateTipoPermisoDto: UpdateTipoPermisoDto, @Req() request: Request) {
    return this.tipoPermisosService.update(+id, updateTipoPermisoDto, request);
  }
/*   @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoPermisosService.remove(+id);
  } */

}
