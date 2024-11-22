import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { AlertasOfertasService } from './alertas_ofertas.service';
import { CreateAlertasOfertaDto } from './dto/create-alertas_oferta.dto';
import { UpdateAlertasOfertaDto } from './dto/update-alertas_oferta.dto';
import { Request } from 'express';
import { SwaggerAlertaOfertasDto } from './dto/swagger-alertas_oferta.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ParametrosAlertasOfertas } from './dto/parametros-alertas_ofertas.dto';
const name = "- AlertaOfertas -"
@ApiTags("Endpoints - Alertas-Ofertas")
@Controller('alertas-ofertas')
export class AlertasOfertasController {
  constructor(private readonly alertasOfertasService: AlertasOfertasService) {}

  @Get()
  @ApiOperation({ summary: `Creamos una ${name} en base a la comparacion de cargos entre ambas tablas , puedes establcer un rango de fechas o por defecto se tomara los ultimos 3 meses` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerAlertaOfertasDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'fecha_inicio', required: true, type: String, description: 'Ingresa la fecha de inicio', example: "2024-08-01" })
  @ApiQuery({ name: 'fecha_fin', required: true, type: String, description: 'Ingresa la fecha final' , example: "2024-08-01"})
  relacionarAlertasOfertas( @Query() parametros: ParametrosAlertasOfertas , @Req() request: Request) {
    return this.alertasOfertasService.relacionarAlertasOfertas( parametros  , request );
  }

 /*  @Get()
  findAll() {
    return this.alertasOfertasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertasOfertasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertasOfertaDto: UpdateAlertasOfertaDto) {
    return this.alertasOfertasService.update(+id, updateAlertasOfertaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertasOfertasService.remove(+id);
  } */
}
