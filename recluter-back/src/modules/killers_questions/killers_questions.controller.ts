import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { KillersQuestionsService } from './killers_questions.service';
import { CreateKillersQuestionDto } from './dto/create-killers_question.dto';
import { UpdateKillersQuestionDto } from './dto/update-killers_question.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationKillerQuestionDto, SwaggerKillerQuestionDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { CreateKillersQuestionsDetailsDto } from './dto/create-killers-questions-details.dto';
const name = "- Killers-Questions - "
@ApiTags("Endpoints - Killers-Questions")
@Controller('killers-questions')
export class KillersQuestionsController {
  constructor(private readonly killersQuestionsService: KillersQuestionsService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerKillerQuestionDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createKillersQuestionDto: CreateKillersQuestionDto, @Req() request: Request) {
    return this.killersQuestionsService.create(createKillersQuestionDto , request);
  }

  @Post('create-details')
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerKillerQuestionDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  createDetails(@Body() createKillersQuestionsDetailsDto: CreateKillersQuestionsDetailsDto, @Req() request: Request) {
    return this.killersQuestionsService.createDetails(createKillersQuestionsDetailsDto , request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerKillerQuestionDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo/string - descripcion/string - tipo/string', example:"descripcion" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'descripcion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'tipo', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(paginate:PaginationKillerQuestionDto) {
    return this.killersQuestionsService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.killersQuestionsService.findOne(+id);
  }

  @Get('details/:offerId')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'offerId', required: true, type: String, description: `Ingresa el ID ${name}` })
  getKillerQuestionsDetailsOfferId(@Param('offerId') offerId: number) {
    return this.killersQuestionsService.getKillerQuestionsDetailsOfferId(+offerId);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateKillersQuestionDto: UpdateKillersQuestionDto, @Req() request: Request) {
    return this.killersQuestionsService.update(+id, updateKillersQuestionDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerKillerQuestionDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.killersQuestionsService.remove(+id , request);
  }
}
