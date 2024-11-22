import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { SoftSkillsService } from './soft_skills.service';
import { CreateSoftSkillDto } from './dto/create-soft_skill.dto';
import { UpdateSoftSkillDto } from './dto/update-soft_skill.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerSoftSkillsDto } from './dto';
import { Request } from 'express';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { PaginationSoftSkillDto } from './dto/pagination-soft_skill.dtos';
const name = "- Soft_skills - "
@ApiTags("Endpoints - Soft-skills")
@Controller('soft-skills')
export class SoftSkillsController {
  constructor(private readonly softSkillsService: SoftSkillsService) {}

  
  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerSoftSkillsDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createSoftSkillDto: CreateSoftSkillDto, @Req() request: Request) {
    return this.softSkillsService.create(createSoftSkillDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Soft-skills', type: [SwaggerSoftSkillsDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - soft_skill/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'soft_skill', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginatinSoftSkill:PaginationSoftSkillDto) {
    return this.softSkillsService.findAll(paginatinSoftSkill);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerSoftSkillsDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de Soft-skills' })
  findOne(@Param('id') id: string) {
    return this.softSkillsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerSoftSkillsDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de Soft-skills' })
  update(@Param('id') id: string, @Body() updateSoftSkillDto: UpdateSoftSkillDto, @Req() request: Request) {
    return this.softSkillsService.update(+id, updateSoftSkillDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerSoftSkillsDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de Soft-skills' })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.softSkillsService.remove(+id, request);
  }
}
