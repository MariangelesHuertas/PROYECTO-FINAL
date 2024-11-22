import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PostulacionesGuardadasService } from './postulaciones_guardadas.service';
import { CreatePostulacionesGuardadaDto } from './dto/create-postulaciones_guardada.dto';
import { UpdatePostulacionesGuardadaDto } from './dto/update-postulaciones_guardada.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerPostulacioneGuardadasDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { PaginationPostulacionesGuardadasDto } from './dto/paginate-postulaciones_guardadas.dto';
const name = "- Postulacion-Guardadas - "
@ApiTags("Endpoints - Postulaciones-Guardadas")

@Controller('postulaciones-guardadas')
export class PostulacionesGuardadasController {
  constructor(private readonly postulacionesGuardadasService: PostulacionesGuardadasService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerPostulacioneGuardadasDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createPostulacionesGuardadaDto: CreatePostulacionesGuardadaDto, @Req() request: Request) {
    return this.postulacionesGuardadasService.create(createPostulacionesGuardadaDto , request);
  }
  @Get('getAllByUserToken')
  @ApiOperation({ summary: `Devuelve un json en base al TOKEN DEL USUARIO` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerPostulacioneGuardadasDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  getAllByUser( @Query() paginate:PaginationPostulacionesGuardadasDto , @Req() request: Request) {
    return this.postulacionesGuardadasService.getAllByUser( paginate , request);
  }
  @Get('findByUser/:id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerPostulacioneGuardadasDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findByUser(@Param('id') id: string) {
    return this.postulacionesGuardadasService.findByUser(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerPostulacioneGuardadasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.postulacionesGuardadasService.remove(+id , request);
  }

  
  /* 
  @Get(':id/getAllByUser')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerPostulacioneGuardadasDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número máximo de resultados por página', example: 10 })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Número de página' , example: 1})
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  getAllByUser(@Param('id') id: string , @Query() paginate:PaginationPostulacionesGuardadasDto) {
    return this.postulacionesGuardadasService.getAllByUser(+id , paginate);
  }
 */

  
}
