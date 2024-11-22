import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { TiposPreguntasService } from './tipos_preguntas.service';
import { CreateTiposPreguntaDto } from './dto/create-tipos_pregunta.dto';
import { UpdateTiposPreguntaDto } from './dto/update-tipos_pregunta.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationTipoPreguntaDto, SwaggerTipoPreguntaDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
const name = "- Tipo-Preguntas - "
@ApiTags("Endpoints - Tipo-Preguntas")
@Controller('tipos-preguntas')
export class TiposPreguntasController {
  constructor(private readonly tiposPreguntasService: TiposPreguntasService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerTipoPreguntaDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createTiposPreguntaDto: CreateTiposPreguntaDto, @Req() request: Request) {
    return this.tiposPreguntasService.create(createTiposPreguntaDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerTipoPreguntaDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre_tipo/string - tipo/string ', example:"nombre_tipo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'tipo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'nombre_tipo', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationTipoPreguntaDto) {
    return this.tiposPreguntasService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTipoPreguntaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.tiposPreguntasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTipoPreguntaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateTiposPreguntaDto: UpdateTiposPreguntaDto, @Req() request: Request) {
    return this.tiposPreguntasService.update(+id, updateTiposPreguntaDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerTipoPreguntaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.tiposPreguntasService.remove(+id , request);
  }
}
