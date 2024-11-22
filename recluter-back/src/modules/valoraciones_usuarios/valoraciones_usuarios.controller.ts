import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { ValoracionesUsuariosService } from './valoraciones_usuarios.service';
import { CreateValoracionesUsuarioDto } from './dto/create-valoraciones_usuario.dto';
import { UpdateValoracionesUsuarioDto } from './dto/update-valoraciones_usuario.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerValoracionUsuarioDto } from './dto/Swagger-valoraciones_usuario.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { PaginationValoracionesEmpresasDto } from '../valoraciones_empresas/dto/paginate-valoraciones_empresas.dto';
const name = "- Valoraciones-Usuarios - "
@ApiTags("Endpoints - Valoraciones-Usuarios")
@Controller('valoraciones-usuarios')
export class ValoracionesUsuariosController {
  constructor(private readonly valoracionesUsuariosService: ValoracionesUsuariosService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerValoracionUsuarioDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createValoracionesUsuarioDto: CreateValoracionesUsuarioDto, @Req() request: Request) {
    return this.valoracionesUsuariosService.createOrUpdate(createValoracionesUsuarioDto, request);
  }


/*   @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionUsuarioDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateValoracionesUsuarioDto: UpdateValoracionesUsuarioDto) {
    return this.valoracionesUsuariosService.update(+id, updateValoracionesUsuarioDto);
  } */
  @Get('findByUser/:userId')
  @ApiOperation({ summary:  `Devuleve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionUsuarioDto })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"valoracion" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'valoracion', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'userId', required: true, type: String, description: `Ingresa el ID ${name}` })
  findByUser(@Param('userId') userId: string, @Query() paginate:PaginationValoracionesEmpresasDto) {
    return this.valoracionesUsuariosService.findByUser(+userId, paginate);
  }
  @Get('findByToken')
  @ApiOperation({ summary:  `Devuleve un json en base al ID de ${name} , pasarle el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerValoracionUsuarioDto })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre - nombre_archivo', example:"valoracion" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'valoracion', required: false, type: Number, description: 'Busqueda por este campo' })
  findByToken(@Req() request:Request, @Query() paginate:PaginationValoracionesEmpresasDto) {
    return this.valoracionesUsuariosService.findByToken(request, paginate);
  }
}
