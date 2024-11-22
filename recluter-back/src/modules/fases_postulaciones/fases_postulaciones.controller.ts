import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { FasesPostulacionesService } from './fases_postulaciones.service';
import { CreateFasesPostulacioneDto } from './dto/create-fases_postulacione.dto';
import { UpdateFasesPostulacioneDto } from './dto/update-fases_postulacione.dto';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerFasesPostulacionesDto } from './dto/Swagger-fases_postulaciones.dto';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
const name = "- Fases_postulaciones - "
@ApiTags("Endpoints - Fases_postulaciones")
@Controller('fases-postulaciones')
export class FasesPostulacionesController {
  constructor(private readonly fasesPostulacionesService: FasesPostulacionesService) {}

  
  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerFasesPostulacionesDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createDto: CreateFasesPostulacioneDto, @Req() request: Request) {
    return this.fasesPostulacionesService.create(createDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerFasesPostulacionesDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - tipo/string ', example:"tipo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'idioma', required: false, type: String, description: 'Busqueda por este campo'  , example:"ingles" })
  findAll() {
    return this.fasesPostulacionesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerFasesPostulacionesDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.fasesPostulacionesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerFasesPostulacionesDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() udpateDto: UpdateFasesPostulacioneDto, @Req() request: Request) {
    return this.fasesPostulacionesService.update(+id, udpateDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerFasesPostulacionesDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.fasesPostulacionesService.remove(+id , request);
  }
}
