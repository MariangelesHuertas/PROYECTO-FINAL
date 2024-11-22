import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AptitudesUsuariosService } from './aptitudes_usuarios.service';
import { CreateAptitudesUsuarioDto } from './dto/create-aptitudes_usuario.dto';
import { UpdateAptitudesUsuarioDto } from './dto/update-aptitudes_usuario.dto';
import { DeleteAptitudesUsuarioDto } from './dto/delete-aptitudes_usuario.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { SwaggerAptitudeDto } from '../aptitudes/dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerAptitudesUsuarioDto } from './dto/Swagger-aptitudes_usuario.dto';
import { Request } from 'express';
const name = "- Aptitudes-Usuarios - "
@ApiTags("Endpoints - Aptitudes-Usuarios ")
@Controller('aptitudes-usuarios')
export class AptitudesUsuariosController {
  constructor(private readonly aptitudesUsuariosService: AptitudesUsuariosService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerAptitudeDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createAptitudesUsuarioDto: CreateAptitudesUsuarioDto, @Req() request: Request) {
    return this.aptitudesUsuariosService.create(createAptitudesUsuarioDto, request);
  }
/* 
  @Get()
  findAll() {
    return this.aptitudesUsuariosService.findAll();
  } */

  @Get('findByUserToken')
  @ApiOperation({ summary: `Devuelve un json en base al ID del ${name} , el usuario se obtiene por el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: [SwaggerAptitudesUsuarioDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  findByUserToken(@Req() request: Request) {
    return this.aptitudesUsuariosService.findByUserToken(request);
  }


  @Get('findByUser/:idUsuario')
  @ApiOperation({ summary: `Devuelve un json en base al ID del ${name} , el usuario se obtiene por el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: [SwaggerAptitudesUsuarioDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idUsuario', required: true, type: String, description: `Ingresa el ID ${name}` })
  findByUser(@Param('idUsuario') idUsuario: string) {
    return this.aptitudesUsuariosService.findByUser(+idUsuario  );
  }

/*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateAptitudesUsuarioDto: UpdateAptitudesUsuarioDto) {
    return this.aptitudesUsuariosService.update(+id, updateAptitudesUsuarioDto);
  } */

  @Delete(':aptitude_id/deleteByUser')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado  , el usuario se obtiene por el TOKEN', type: SwaggerAptitudesUsuarioDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'aptitude_id', required: true, type: String, description: `Ingresa el aptitude_id ${name}` })
  remove(@Param('aptitude_id') aptitude_id: string, @Req() request: Request) {
    return this.aptitudesUsuariosService.remove( +aptitude_id , request);
  }
}
