import { Controller, Get, Post, Body, Param, Delete, Put, Query, Req } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto, UpdatePermisoDto, editPermiso, SwaggerTipoPermisoDto, swaggerTipoPermisoFormatDto,  PaginationPermisoDto } from './dto/index'
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { FilterFieldPermisosUsuarios } from './dto/filter-field.dto';
import { CreatePermisosUsuario } from './dto/create-permiso-usuarios.dto';
const name = "- Permisos - "
@ApiTags('Endpoints - Permisos')
@Controller('permisos')
export class PermisosController {
  constructor(private readonly permisosService: PermisosService) { }

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerTipoPermisoDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createPermisoDto: CreatePermisoDto, @Req() request: Request) {
    return this.permisosService.create(createPermisoDto , request);
  }
  @Get()
  @ApiOperation({ summary: 'Devuelve una lista de los permisos agrupados por tipo de permisos' })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de permisos', type: [swaggerTipoPermisoFormatDto] })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_permiso_id', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - slug/string - descripcion/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'slug', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'descripcion', required: false, type: String, description: 'Busqueda por este campo' })
  
  findAll(@Query() paginatePermiso:PaginationPermisoDto) {
    return this.permisosService.findAll(paginatePermiso);
  }

  @Get(':id')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTipoPermisoDto })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  findOne(@Param('id') id: string) {
    return this.permisosService.findOne(+id);
  }
  /* @ApiQuery({name:"id" , required:true ,description: "Id del Permiso" }) */

/*   @Put(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerTipoPermisoDto })
  @ApiResponse({ status: 400, description: 'No se encontro el tipo_permiso_id', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', required: true, type: String, description: `Ingresa el ID ${name}` })
  update(@Param('id') id: string, @Body() updatePermisoDto: UpdatePermisoDto, @Req() request: Request) {
    return this.permisosService.update(+id, updatePermisoDto , request);
  } */

 /*  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permisosService.remove(+id);
  } */
  @Post('/editPermiso')
  @ApiOperation({ summary: 'Asignar un permiso a un tipo de permisos , aqui vamos a actualizar el tipo_permiso_id del tipo permiso' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto actualizado', type: SwaggerTipoPermisoDto })
  @ApiResponse({ status: 400, description: 'No se encontro el id', type: SwaggerResponseFormatDto })
  editPermiso(@Body() editPermiso: editPermiso, @Req() request: Request) {
    return this.permisosService.editPermiso(editPermiso , request)
  }

  @Get('permisos-tipos-usuario/:id')
  @ApiOperation({ summary: 'Devuelve un json en base a la tabla PERMISOS-TIPOS-USUARIOS' })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: [swaggerTipoPermisoFormatDto] })
  @ApiResponse({ status: 400, description: 'ingresa un ID valido', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'sortColum', required: false, type: Number, description: 'Ordenar por columna - tipos_permisos/permisos' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena por columna  - asc/desc' })
  findAllUsuarioPermisos(@Param('id') id: number , @Query() paginate: FilterFieldPermisosUsuarios) {
    return this.permisosService.findAllUsuarioPermisos(id , paginate);
  }

  @Post('createPermisoTipoUsuario')
  @ApiOperation({ summary: 'PERMISOS-TIPOS-USUARIOS , Asignar un tipo_usuario_id a varios permisos_id' })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el numero de registro modificados', type:CreatePermisosUsuario  })
  @ApiResponse({ status: 400, description: 'No se encontro el id', type: SwaggerResponseFormatDto })
  createOrUpdatePermisosUsuario(@Body() createUsuarioDto: CreatePermisosUsuario, @Req() request: Request) {
    return this.permisosService.createOrUpdatePermisosUsuario(createUsuarioDto, request);
  }

}
