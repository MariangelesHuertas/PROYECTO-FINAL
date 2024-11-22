import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ValoracionesEmpresasService } from './valoraciones_empresas.service';
import { CreateValoracionesEmpresaDto } from './dto/create-valoraciones_empresa.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerValoracionEmpresaDto } from './dto/Swagger-valoraciones_empresa.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { PaginationValoracionesEmpresasDto } from './dto/paginate-valoraciones_empresas.dto';
import { ValoracionStatsDto } from './dto/valoracion.dto';
const name = "- Valoraciones_Empresas - "
@ApiTags("Endpoints - Valoraciones-empresas")

@Controller('valoraciones-empresas')
export class ValoracionesEmpresasController {
  constructor(private readonly valoracionesEmpresasService: ValoracionesEmpresasService) {}

  @Post()
  @ApiOperation({ summary: `Creamos o actualizamos una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto modificacdo', type: SwaggerValoracionEmpresaDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createValoracionesEmpresaDto: CreateValoracionesEmpresaDto, @Req() request: Request) {
    return this.valoracionesEmpresasService.createOrUpdate(createValoracionesEmpresaDto , request);
  }

  @Get('findByUser/:userId')
  @ApiOperation({ summary: `Devuleve un json en base al ID de ${name} ` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionEmpresaDto })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"valoracion" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'valoracion', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findByUser(@Param('userId') userId: string , @Query() paginate:PaginationValoracionesEmpresasDto) {
    return this.valoracionesEmpresasService.findByUser(+userId , paginate);
  }

  @Get('findByToken')
  @ApiOperation({ summary: `Devuleve un json en base al ID de ${name} , el user lo obtiene por el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionEmpresaDto })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"valoracion" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'valoracion', required: false, type: Number, description: 'Busqueda por este campo' })
  findByToken( @Req() request: Request , @Query() paginate:PaginationValoracionesEmpresasDto) {
    return this.valoracionesEmpresasService.findByToken(request , paginate);
  }
  
  @Get('stats/:empresaId')
  @ApiOperation({ summary: `Obtiene estadísticas de valoraciones para una empresa` })
  @ApiResponse({ status: 200, description: 'Devuelve estadísticas de valoraciones', type: [ValoracionStatsDto] })
  @ApiResponse({ status: 400, description: 'Error en la solicitud', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'empresaId', required: true, type: Number, description: 'ID de la empresa' })
  getEmpresaStats(@Param('empresaId') empresaId: number, @Req() request: Request) {
    return this.valoracionesEmpresasService.getEmpresaStats(request, empresaId);
  }
/* 
  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con el ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionEmpresaDto })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_permiso_id', type: SwaggerResponseFormatDto })
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdateValoracionesEmpresaDto, @Req() request: Request) {
    return this.valoracionesEmpresasService.update(+id, updatePermisoDto , request);
  } */

}
