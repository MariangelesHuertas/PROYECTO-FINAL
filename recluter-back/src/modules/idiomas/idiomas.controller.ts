import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { IdiomasService } from './idiomas.service';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PaginationIdiomaaDto } from './dto/paginate-idioma.dto';
import { SwaggerIdiomaDto } from './dto/Swagger-idioma.dto';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
const name = "- Idiomas - "
@ApiTags("Endpoints - Idiomas")
@Controller('idiomas')
export class IdiomasController {
  constructor(private readonly idiomasService: IdiomasService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerIdiomaDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createDto: CreateIdiomaDto, @Req() request: Request) {
    return this.idiomasService.create(createDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerIdiomaDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - tipo/string ', example:"tipo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'idioma', required: false, type: String, description: 'Busqueda por este campo'  , example:"ingles" })
  findAll(@Query() paginate:PaginationIdiomaaDto) {
    return this.idiomasService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.idiomasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() udpateDto: UpdateIdiomaDto, @Req() request: Request) {
    return this.idiomasService.update(+id, udpateDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.idiomasService.remove(+id , request);
  }
}
