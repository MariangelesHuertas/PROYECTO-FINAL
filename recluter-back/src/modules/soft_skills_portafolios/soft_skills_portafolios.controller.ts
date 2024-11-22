import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SoftSkillsPortafoliosService } from './soft_skills_portafolios.service';
import { CreateSoftSkillsPortafolioDto } from './dto/create-soft_skills_portafolio.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
import { SwaggerCountResponse } from './dto/swagger-soft_skills_portafolio.dto';

@Controller('soft-skills-portafolios')
export class SoftSkillsPortafoliosController {
  constructor(private readonly softSkillsPortafoliosService: SoftSkillsPortafoliosService) {}

  @Post('createSoftPortafolio')
  @ApiOperation({ summary: 'Devuelve el numero de registros insertados' })
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados', type: SwaggerCountResponse })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  createOrUpdateSkillOferta(@Body() skillOferta:CreateSoftSkillsPortafolioDto, @Req() request: Request) {
    return this.softSkillsPortafoliosService.createOrUpdateSkillOferta(skillOferta, request)
  }
}
