import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { TiposEducacionService } from './tipos_educacion.service';
import { Request } from 'express';
import { CreateTiposEducacionDto , PaginationTiposEducacinoDto, SwaggerTiposEducacionDto, UpdateTiposEducacionDto } from './dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';

const name = "- TipoEducacion - "
@ApiTags("Endpoints - TipoEducacion")

@Controller('tipos-educacion')
export class TiposEducacionController {
  constructor(private readonly tiposEducacionService: TiposEducacionService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerTiposEducacionDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createTiposEducacionDto: CreateTiposEducacionDto, @Req() request: Request) {
    return this.tiposEducacionService.create(createTiposEducacionDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Aptitudes', type: [SwaggerTiposEducacionDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna - empresa/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'empresa', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationTiposEducacinoDto) {
    return this.tiposEducacionService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTiposEducacionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  findOne(@Param('id') id: string) {
    return this.tiposEducacionService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTiposEducacionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  update(@Param('id') id: string, @Body() updateTiposEducacionDto: UpdateTiposEducacionDto, @Req() request: Request) {
    return this.tiposEducacionService.update(+id, updateTiposEducacionDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerTiposEducacionDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.tiposEducacionService.remove(+id , request);
  }
}
