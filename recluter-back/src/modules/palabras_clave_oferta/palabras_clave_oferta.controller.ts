import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PalabrasClaveOfertaService } from './palabras_clave_oferta.service';
import { CreatePalabrasClaveOfertaDto } from './dto/create-palabras_clave_oferta.dto';
import { UpdatePalabrasClaveOfertaDto } from './dto/update-palabras_clave_oferta.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerCountResponse, SwaggerPalabraOfertaDto } from './dto/swagger-palabras_clave_oferta.dto';
import { Request } from 'express';
@ApiTags("Endpoints - palabras_clave_oferta -")
@Controller('palabras-clave-oferta')
export class PalabrasClaveOfertaController {
  constructor(private readonly palabrasClaveOfertaService: PalabrasClaveOfertaService) {}

  @Post()
  @ApiOperation({ summary: 'Devuelve el numero de registros insertados' })
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados', type: SwaggerCountResponse })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  createOrUpdatePalabraOferta(@Body() palabraClave:CreatePalabrasClaveOfertaDto, @Req() request: Request){
    return this.palabrasClaveOfertaService.createOrUpdatePalabraOferta(palabraClave , request)
  }

  @Get(':idOferta')
  @ApiOperation({ summary: 'Devuelve el los registros vinculados al ID_OFERTA' })
  @ApiResponse({ status: 201, description: 'Devuelve el los registros vinculados al ID_OFERTA', type: SwaggerPalabraOfertaDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  getAllByOferta(@Param('idOferta') idOferta:string){
    return this.palabrasClaveOfertaService.getAllByOferta(+idOferta)
  }
}
