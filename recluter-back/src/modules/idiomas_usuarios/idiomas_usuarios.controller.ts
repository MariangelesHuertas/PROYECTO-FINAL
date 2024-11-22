import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IdiomasUsuariosService } from './idiomas_usuarios.service';
import { CreateIdiomasUsuarioDto } from './dto/create-idiomas_usuario.dto';
import { UpdateIdiomasUsuarioDto } from './dto/update-idiomas_usuario.dto';
import { Request } from 'express';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
const name = "- Idiomas-Usuarios - "
@ApiTags("Endpoints - Idiomas-Usuarios")
@Controller('idiomas-usuarios')
export class IdiomasUsuariosController {
  constructor(private readonly idiomasUsuariosService: IdiomasUsuariosService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Devuelve el numero de registros insertados , pasarle el un array de niveles_idioma , el usuario se obtiene por el TOKEN'})
  createOrUpdateNivelesUsuario(@Body() createIdiomasUsuarioDto: CreateIdiomasUsuarioDto,@Req() request: Request) {
    return this.idiomasUsuariosService.createOrUpdateNivelesUsuario(createIdiomasUsuarioDto ,request);
  }

  @Get("findAllNivelesIdiomaByUserToken")
  @ApiOperation({ summary: `Devuelve todos los objetos pertenecientes a un Usuario - se obtiene por el token , no pasarle id ` })
  findAllNivelesIdiomasByUsuarioToken(@Req() request: Request) {
    return this.idiomasUsuariosService.findAllNivelesIdiomasByUsuarioToken( request);
  }

  @Get("findAllNivelesIdiomaByUser/:idUsuario")
  @ApiOperation({ summary: `Devuelve todos los objetos pertenecientes a un Usuario` })
  @ApiParam({ name: 'idUsuario', required: true, type: String, description: `Ingresa el ID ${name}` })
  findAllNivelesIdiomasByUsuario(@Param('idUsuario') idUsuario: string) {
    return this.idiomasUsuariosService.findAllNivelesIdiomasByUsuario( +idUsuario);
  }

}
