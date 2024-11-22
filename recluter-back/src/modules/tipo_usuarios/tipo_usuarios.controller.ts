import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { TipoUsuariosService } from './tipo_usuarios.service';
import { CreateTipoUsuarioDto } from './dto/create-tipo_usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo_usuario.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerTipoUsuarioDto } from './dto/swagger-tipo_usuario.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
@ApiTags('Endpoints - Tipo Usuarios')
@Controller('tipo-usuarios')
export class TipoUsuariosController {
  constructor(private readonly tipoUsuariosService: TipoUsuariosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Tipo de Usuario' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado' , type:SwaggerTipoUsuarioDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error'  , type:SwaggerResponseFormatDto})
  create(@Body() createTipoUsuarioDto: CreateTipoUsuarioDto, @Req() request: Request) {
    return this.tipoUsuariosService.create(createTipoUsuarioDto, request);
  }

  @Get()
  @ApiOperation({ summary: 'Devuelve una lista con todos los Tipos de Usuario' })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de elementos' , type:[SwaggerTipoUsuarioDto ] })
  @ApiResponse({ status: 400, description: 'Error al obtener el json '  , type:SwaggerResponseFormatDto})
  findAll() {
    return this.tipoUsuariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoUsuariosService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizamos un Tipo de Usuario' })
  @ApiResponse({ status: 200, description: 'Devuelve un json con el objecto actualizado' , type:SwaggerTipoUsuarioDto  })
  @ApiResponse({ status: 400, description: 'Error al actualizar'  , type:SwaggerResponseFormatDto})
  @ApiQuery({name:"id" , required:true ,description: "Id del Tipo_Usuario"})
  update(@Param('id') id: string, @Body() updateTipoUsuarioDto: UpdateTipoUsuarioDto, @Req() request: Request) {
    return this.tipoUsuariosService.update(+id, updateTipoUsuarioDto, request);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoUsuariosService.remove(+id);
  }
}
