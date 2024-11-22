import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { AlertasService } from './alertas.service';
import { CreateAlertaDto } from './dto/create-alerta.dto';
import { UpdateAlertaDto } from './dto/update-alerta.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationAlertaDto, SwaggerAlertaDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
const name = "- Alertas - "
@ApiTags("Endpoints - Alertas")
@Controller('alertas')
export class AlertasController {
  constructor(private readonly alertasService: AlertasService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerAlertaDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createTiposPreguntaDto: CreateAlertaDto, @Req() request: Request) {
    return this.alertasService.create(createTiposPreguntaDto , request);
  }



  @Get(':usuarioId')
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerAlertaDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - nombre/string - cargo/string - temporalidad/string ', example:"temporalidad" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'temporalidad', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'usuarioId', type: String, description: `ID de la ${name}` })
  findAll(@Param('usuarioId') usuarioId: string ,@Query() paginate:PaginationAlertaDto) {

    return this.alertasService.findAll(+usuarioId ,paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerAlertaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.alertasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerAlertaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateTiposPreguntaDto: UpdateAlertaDto ,  @Req() request: Request) {
    return this.alertasService.update(+id, updateTiposPreguntaDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerAlertaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.alertasService.remove(+id , request);
  }
}
