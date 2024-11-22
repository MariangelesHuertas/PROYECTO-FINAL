import { Controller, Post, Body, Get, Param, Req} from '@nestjs/common';
import { SoftSkillsOfertaService } from './soft_skills_oferta.service';
import { CreateSoftSkillsOfertaDto } from './dto/create-soft_skills_oferta.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { SwaggerCountResponse, SwaggerSkillOfertaDto } from './dto/swagger-soft_skills_oferta.dto';
import { Request } from 'express';
@ApiTags("Endpoints - Soft-skills-Oferta")
@Controller('soft-skills-oferta')
export class SoftSkillsOfertaController {
  constructor(private readonly softSkillsOfertaService: SoftSkillsOfertaService) { }

  @Post('CreateSoftOferta')
  @ApiOperation({ summary: 'Devuelve el numero de registros insertados' })
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados', type: SwaggerCountResponse })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  createOrUpdateSkillOferta(@Body() skillOferta:CreateSoftSkillsOfertaDto, @Req() request: Request) {
    return this.softSkillsOfertaService.createOrUpdateSkillOferta(skillOferta, request)
  }
  @Get(':idOferta')
  @ApiOperation({ summary: 'Devuelve el los registros vinculados al ID_OFERTA' })
  @ApiResponse({ status: 201, description: 'Devuelve el los registros vinculados al ID_OFERTA', type: SwaggerSkillOfertaDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  getAllByOferta(@Param('idOferta') idOferta:string){
    return this.softSkillsOfertaService.getAllByOferta(+idOferta)
  }
}
