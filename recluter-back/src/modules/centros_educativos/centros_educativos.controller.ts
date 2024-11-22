import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { CentrosEducativosService } from './centros_educativos.service';
import { CreateCentrosEducativoDto  , PaginationCentrosEducativosDto, SwaggerCentrosEducativoDto, UpdateCentrosEducativoDto} from './dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
const name = "- Centros-Educativos - "
@ApiTags("Endpoints - Centros-Educativos")
@Controller('centros-educativos')
export class CentrosEducativosController {
  constructor(private readonly centrosEducativosService: CentrosEducativosService) {}

 
  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerCentrosEducativoDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createCentrosEducativoDto: CreateCentrosEducativoDto , @Req() request: Request) {
    return this.centrosEducativosService.create(createCentrosEducativoDto , request );
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name}` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de ${name}`, type: [SwaggerCentrosEducativoDto] })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - centro_educativo/int ', example:"centro_educativo" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "asc"})
  @ApiQuery({ name: 'centro_educativo', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationCentrosEducativosDto) {
    return this.centrosEducativosService.findAll(paginate);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.centrosEducativosService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateCentrosEducativoDto: UpdateCentrosEducativoDto, @Req() request: Request) {
    return this.centrosEducativosService.update(+id, updateCentrosEducativoDto, request );
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string , @Req() request: Request) {
    return this.centrosEducativosService.remove(+id, request );
  }
}
