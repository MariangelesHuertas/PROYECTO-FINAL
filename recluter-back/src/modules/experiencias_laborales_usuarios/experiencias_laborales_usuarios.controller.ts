import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { ExperienciasLaboralesUsuariosService } from './experiencias_laborales_usuarios.service';
import { CreateExperienciasLaboralesUsuarioDto } from './dto/create-experiencias_laborales_usuario.dto';
import { UpdateExperienciasLaboralesUsuarioDto } from './dto/update-experiencias_laborales_usuario.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { SwaggerExperienciaLaboralesUsuariDto } from './dto/Swagger-experiencias-laborales_usuario.dto';
import { Request } from 'express';
const name = "- Experiencias-Laborales-Usuarios - "
@ApiTags("Endpoints - Experiencias-Laborales-Usuarios")
@Controller('experiencias-laborales-usuarios')
export class ExperienciasLaboralesUsuariosController {
  constructor(private readonly experienciasLaboralesUsuariosService: ExperienciasLaboralesUsuariosService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerExperienciaLaboralesUsuariDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createExperienciasLaboralesUsuarioDto: CreateExperienciasLaboralesUsuarioDto, @Req() request: Request) {
    return this.experienciasLaboralesUsuariosService.create(createExperienciasLaboralesUsuarioDto, request);
  }

  @Get('findAllByUserToken')
  @ApiOperation({ summary: `Devuelve un json en base de ${name} , el user se obtiene por el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: [SwaggerExperienciaLaboralesUsuariDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  findAllByUserToken(@Req() request: Request) {
    return this.experienciasLaboralesUsuariosService.findAllByUserToken(request);
  }

  @Get('findAllByUser/:idUser')
  @ApiOperation({ summary: `Devuelve un json en base de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: [SwaggerExperienciaLaboralesUsuariDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idUser', type: String, description: `Ingresa el ID ${name}` })
  findAllByUser(@Param('idUser') idUser: string,@Req() request: Request) {
    return this.experienciasLaboralesUsuariosService.findAllByUser(+idUser );
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerExperienciaLaboralesUsuariDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updateExperienciasLaboralesUsuarioDto: UpdateExperienciasLaboralesUsuarioDto, @Req() request: Request) {
    return this.experienciasLaboralesUsuariosService.update(+id, updateExperienciasLaboralesUsuarioDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerExperienciaLaboralesUsuariDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.experienciasLaboralesUsuariosService.remove(+id, request);
  }
}
