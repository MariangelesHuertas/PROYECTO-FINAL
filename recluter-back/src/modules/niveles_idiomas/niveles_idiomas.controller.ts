import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { NivelesIdiomasService } from './niveles_idiomas.service';
import { CreateNivelesIdiomaDto } from './dto/create-niveles_idioma.dto';
import { UpdateNivelesIdiomaDto } from './dto/update-niveles_idioma.dto';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationNivelesIdiomaDto } from './dto/paginate-niveles_idioma.dto';
import { SwaggerNivelIdiomaDto } from './dto/Swagger-niveles-idioma.dto';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
const name = "- nivel_idioma - "

@ApiTags("Endpoints - Niveles-Idiomas")
@Controller('niveles-idiomas')
export class NivelesIdiomasController {
  constructor(private readonly nivelesIdiomasService: NivelesIdiomasService) {}
  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerNivelIdiomaDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createDto: CreateNivelesIdiomaDto, @Req() request: Request) {
    return this.nivelesIdiomasService.create(createDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerNivelIdiomaDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - tipo/string ', example:"tipo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'idioma', required: false, type: String, description: 'Busqueda por este campo'  , example:"ingles" })
  findAll(@Query() paginate:PaginationNivelesIdiomaDto) {
    return this.nivelesIdiomasService.findAll(paginate);
  }


  @Get("findAllByIdioma/:id")
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerNivelIdiomaDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - tipo/string ', example:"tipo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'idioma', required: false, type: String, description: 'Busqueda por este campo'  , example:"ingles" })
  findAllByIdioma(@Param('id') id: string , @Query() paginate:PaginationNivelesIdiomaDto) {
    return this.nivelesIdiomasService.findAllByIdioma(+id , paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerNivelIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.nivelesIdiomasService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerNivelIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() udpateDto: UpdateNivelesIdiomaDto, @Req() request: Request) {
    return this.nivelesIdiomasService.update(+id, udpateDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerNivelIdiomaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.nivelesIdiomasService.remove(+id , request);
  }
}
