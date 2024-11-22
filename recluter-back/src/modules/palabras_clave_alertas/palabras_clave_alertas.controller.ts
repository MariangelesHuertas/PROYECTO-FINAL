import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { PalabrasClaveAlertasService } from './palabras_clave_alertas.service';
import { CreatePalabrasClaveAlertaDto } from './dto/create-palabras_clave_alerta.dto';
import { UpdatePalabrasClaveAlertaDto } from './dto/update-palabras_clave_alerta.dto';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerPalabraClaveDto } from '../palabras_clave/dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
@ApiTags("Endpoints - palabras_clave_alertas -")
@Controller('palabras-clave-alertas')
export class PalabrasClaveAlertasController {
  constructor(private readonly palabrasClaveAlertasService: PalabrasClaveAlertasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una Palabra-clave-alerta' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado' , type:SwaggerPalabraClaveDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error'  , type:SwaggerResponseFormatDto})
  createOrUpdate(@Body() createPalabrasClaveAlertaDto: CreatePalabrasClaveAlertaDto, @Req() request: Request) {
    return this.palabrasClaveAlertasService.createOrUpdate(createPalabrasClaveAlertaDto , request);
  }

  @Get(':idAlerta')
  @ApiOperation({ summary: 'Buscar registros que concidan con el idAlerta' })
  @ApiResponse({ status: 200, description: 'Devuelve un json con el objeto actualizado' , type:SwaggerPalabraClaveDto })
  @ApiResponse({ status: 400, description: 'Error al actualizar'  , type:SwaggerResponseFormatDto})
  @ApiParam({name:"idAlerta" , required:true ,description: "Id de la Alerta"})
  getAllByAlerta(@Param('idAlerta') idOferta:string){
    return this.palabrasClaveAlertasService.getAllByAlerta(+idOferta)
  }
/*   @Get()
  findAll() {
    return this.palabrasClaveAlertasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.palabrasClaveAlertasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePalabrasClaveAlertaDto: UpdatePalabrasClaveAlertaDto) {
    return this.palabrasClaveAlertasService.update(+id, updatePalabrasClaveAlertaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.palabrasClaveAlertasService.remove(+id);
  } */
}
