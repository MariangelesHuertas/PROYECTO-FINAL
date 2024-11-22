import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AptitudesOfertaService } from './aptitudes_oferta.service';
import { CreateAptitudesOfertaDto } from './dto/create-aptitudes_oferta.dto';
import { UpdateAptitudesOfertaDto } from './dto/update-aptitudes_oferta.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { SwaggerAptitudeOfertaDto, SwaggerCountResponse } from './dto/swagger-aptitud-oferta.dto';
import { Request } from 'express';
const name = "- Aptitude-Oferta - "
@ApiTags("Endpoints - Aptitud-Oferta")
@Controller('aptitudes-oferta')
export class AptitudesOfertaController {
  constructor(private readonly aptitudesOfertaService: AptitudesOfertaService) {}

  @Post('CreateAptitudesOferta')
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados', type: SwaggerCountResponse})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  createOrUpdateAptitudeOferta(@Body() skillOferta:CreateAptitudesOfertaDto, @Req() request: Request) {
    return this.aptitudesOfertaService.createOrUpdateAptitudeOferta(skillOferta, request)
  }
  @Get(':idOferta')
  @ApiOperation({ summary: 'Devuelve el los registros vinculados al ID_OFERTA' })
  @ApiResponse({ status: 201, description: 'Devuelve el los registros vinculados al ID_OFERTA', type: SwaggerAptitudeOfertaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  getAllByOferta(@Param('idOferta') idOferta:string){
    return this.aptitudesOfertaService.getAllByOferta(+idOferta)
  }
}
