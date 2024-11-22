import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { AptitudesService } from './aptitudes.service';
import { CreateAptitudeDto } from './dto/create-aptitude.dto';
import { UpdateAptitudeDto } from './dto/update-aptitude.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerAptitudeDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { PaginationAptitudeDto } from './dto/pagination-aptitude.dto';
import { Request } from 'express';
const name = "- Aptitudes - "
@ApiTags("Endpoints - Aptitudes")
@Controller('aptitudes')
export class AptitudesController {
  constructor(private readonly aptitudesService: AptitudesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Aptitud' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerAptitudeDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createAptitudeDto: CreateAptitudeDto , @Req() request: Request) {
    return this.aptitudesService.create(createAptitudeDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Aptitudes', type: [SwaggerAptitudeDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - aptitude/string', example: "aptitude" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'aptitud', required: false, type: String, description: 'Busqueda por este campo',style: 'pipeDelimited' })
  @ApiParam({ name: 'usuarioId', type: String, description: `ID de la ${name}` })
  findAll(@Query() paginationAptitude:PaginationAptitudeDto) {
    return this.aptitudesService.findAll(paginationAptitude);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerAptitudeDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  findOne(@Param('id') id: string) {
    return this.aptitudesService.findOne(+id);
  }


  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerAptitudeDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  update(@Param('id') id: string, @Body() updateAptitudeDto: UpdateAptitudeDto, @Req() request: Request) {
    return this.aptitudesService.update(+id, updateAptitudeDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerAptitudeDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.aptitudesService.remove(+id , request);
  }
}
