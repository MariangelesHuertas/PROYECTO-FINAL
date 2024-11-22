import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DetalleKillersQuestionsService } from './detalle_killers_questions.service';
import { CreateDetalleKillersQuestionDto } from './dto/create-detalle_killers_question.dto';
import { UpdateDetalleKillersQuestionDto } from './dto/update-detalle_killers_question.dto';
import { PaginationDetalleKillerQuestionDto, SwaggerDetalleKillerQuestionDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
const name = "- Detalle-Killers-Questions - "
@ApiTags("Endpoints - Detalle--------Killers-Questions")
@Controller('detalle-killers-questions')
export class DetalleKillersQuestionsController {
  constructor(private readonly detalleKillersQuestionsService: DetalleKillersQuestionsService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerDetalleKillerQuestionDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createDetalleKillersQuestionDto: CreateDetalleKillersQuestionDto, @Req() request: Request) {
    return this.detalleKillersQuestionsService.create(createDetalleKillersQuestionDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerDetalleKillerQuestionDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - detalle/string', example:"detalle tal ..." })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiParam({ name: 'detalle', required: false, type: Number, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationDetalleKillerQuestionDto) {
    return this.detalleKillersQuestionsService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerDetalleKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.detalleKillersQuestionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerDetalleKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateDetalleKillersQuestionDto: UpdateDetalleKillersQuestionDto, @Req() request: Request) {
    return this.detalleKillersQuestionsService.update(+id, updateDetalleKillersQuestionDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerDetalleKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.detalleKillersQuestionsService.remove(+id, request);
  }
}
