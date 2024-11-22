import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PalabrasClaveService } from './palabras_clave.service';
import { CreatePalabrasClaveDto } from './dto/create-palabras_clave.dto';
import { UpdatePalabrasClaveDto } from './dto/update-palabras_clave.dto';
import { PaginationPalabrasClaveDto, SwaggerPalabraClaveDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
const name = "- Palabras-clave - "
@ApiTags("Endpoints - Palabras Clave")
@Controller('palabras-clave')
export class PalabrasClaveController {
  constructor(private readonly palabrasClaveService: PalabrasClaveService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerPalabraClaveDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createPalabrasClaveDto: CreatePalabrasClaveDto, @Req() request: Request) {
    return this.palabrasClaveService.create(createPalabrasClaveDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Palabras clave', type: [SwaggerPalabraClaveDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - palabra/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'palabra', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginationPalabra:PaginationPalabrasClaveDto) {
    return this.palabrasClaveService.findAll(paginationPalabra);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerPalabraClaveDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la palabra clave a buscar' })
  findOne(@Param('id') id: string) {
    return this.palabrasClaveService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerPalabraClaveDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la palabra clave a buscar' })
  update(@Param('id') id: string, @Body() updatePalabrasClaveDto: UpdatePalabrasClaveDto, @Req() request: Request) {
    return this.palabrasClaveService.update(+id, updatePalabrasClaveDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerPalabraClaveDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la palabra clave a buscar' })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.palabrasClaveService.remove(+id, request);
  }
}
