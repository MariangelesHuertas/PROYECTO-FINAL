import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CondicionesKillersQuestionsService } from './condiciones_killers_questions.service';
import { CreateCondicionesKillersQuestionDto } from './dto/create-condiciones_killers_question.dto';
import { UpdateCondicionesKillersQuestionDto } from './dto/update-condiciones_killers_question.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationCondicionKillerQuestionsDto, SwaggerCondicionKillerQuestionsDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
const name = "- Condition-Killer-Questions - "

@ApiTags("Endpoints - Condition-Killers-Questions")
@Controller('condiciones-killers-questions')
export class CondicionesKillersQuestionsController {
  constructor(private readonly condicionesKillersQuestionsService: CondicionesKillersQuestionsService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerCondicionKillerQuestionsDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createCondicionesKillersQuestionDto: CreateCondicionesKillersQuestionDto, @Req() request: Request) {
    return this.condicionesKillersQuestionsService.create(createCondicionesKillersQuestionDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerCondicionKillerQuestionsDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - minimo/int - maximo/int - valor/string', example:"minimo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'minimo', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'maximo', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'valor', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationCondicionKillerQuestionsDto) {
    return this.condicionesKillersQuestionsService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCondicionKillerQuestionsDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.condicionesKillersQuestionsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCondicionKillerQuestionsDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateCondicionesKillersQuestionDto: UpdateCondicionesKillersQuestionDto, @Req() request: Request) {
    return this.condicionesKillersQuestionsService.update(+id, updateCondicionesKillersQuestionDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerCondicionKillerQuestionsDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.condicionesKillersQuestionsService.remove(+id, request);
  }
}
