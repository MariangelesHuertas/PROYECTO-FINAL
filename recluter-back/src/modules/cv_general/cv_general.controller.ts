import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CvGeneralService } from './cv_general.service';
import { CreateCvGeneralDto } from './dto/create-cv_general.dto';
import { UpdateCvGeneralDto } from './dto/update-cv_general.dto';
import { PaginationCvUsuariosGeneral } from './dto/pagination-cv_general.dto';
import { FilterCvGeneral } from './dto/filter-cv_general.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';
const name = "- Cv-Genral_cantidatos - "
@ApiTags("Endpoints - Cv-General_candidatos")
@Controller('cv-general')
export class CvGeneralController {
  constructor(private readonly cvGeneralService: CvGeneralService) {}
  @Get( )
  @ApiOperation({ summary: `Devuelve una lista de usuarios que tengan el tipo_usuario = candidato` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de usuarios` })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - sector/int ', example:"sector" })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' , example: "desc/asc"})
  @ApiQuery({ name: 'nombre', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'apellido_paterno', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'apellido_materno', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'usuario', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'meses_experiencia', required: false, type: Number, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubicacion', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginate:PaginationCvUsuariosGeneral , @Body() filtros:FilterCvGeneral) {
    return this.cvGeneralService.findAll(paginate , filtros);
  }

  @Get(':userId')
  @ApiOperation({ summary: `Devuelve una lista de Usuarios que tengan como tipo_usuario = candidato` })
  @ApiResponse({ status: 200, description: `Devuelve una lista de usaurios` })
  @ApiResponse({ status: 400, description: `Error al hacer la consulta`, type: SwaggerResponseFormatDto })
  findCVbyUer(@Param('userId') userId: string) {
    return this.cvGeneralService.findCVbyUer(+userId);
  }


}
