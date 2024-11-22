import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EducacionUsuariosService } from './educacion_usuarios.service';
import { CreateEducacionUsuarioDto, UpdateEducacionUsuarioDto, PaginationCentrosEducativosDto, SwaggerCentrosEducativoDto } from './dto'
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
const name = "- Centro-educativo - "
@ApiTags("Endpoints - Educacion-usuarios")
@Controller('educacion-usuarios')
export class EducacionUsuariosController {
  constructor(private readonly educacionUsuariosService: EducacionUsuariosService) { }

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createEducacionUsuarioDto: CreateEducacionUsuarioDto, @Req() request: Request) {
    return this.educacionUsuariosService.create(createEducacionUsuarioDto, request);
  }

  /* @Get()
  
  findAll() {
    return this.educacionUsuariosService.findAll();
  } */
  @Get('findByUserToken')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name} , el user lo obtiene del TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  findByUserToken(@Req() request: Request) {
    return this.educacionUsuariosService.findByUserToken(request);
  }

  @Get('findByUser/:idUsuario')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name} ` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idUsuario', type: String, description: `ID de la empresa ${name}` })
  findByUser(@Param('idUsuario') idUsuario: string) {
    return this.educacionUsuariosService.findByUser(+idUsuario);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la empresa' })
  update(@Param('id') id: string, @Body() updateEducacionUsuarioDto: UpdateEducacionUsuarioDto, @Req() request: Request) {
    return this.educacionUsuariosService.update(+id, updateEducacionUsuarioDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerCentrosEducativoDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la empresa ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.educacionUsuariosService.remove(+id, request);
  }
}
