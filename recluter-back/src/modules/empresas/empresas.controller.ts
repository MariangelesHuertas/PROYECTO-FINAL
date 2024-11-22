import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationEmpresaDto, SwaggerEmpresasDto } from './dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { FilterEmpresaArray } from './dto/filters-empresa.dto';
const name = "- Empresas - "
@ApiTags("Endpoints - Empresas")
@Controller('empresas')
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) { }

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createEmpresaDto: CreateEmpresaDto, @Req() request: Request) {
    return this.empresasService.create(createEmpresaDto, request);
  }

  @Get()
  @ApiOperation({ summary: `Devuelve una lista de TODOS los ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Aptitudes', type: [SwaggerEmpresasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna - empresa/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'empresa', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginationEmpresa: PaginationEmpresaDto, @Body() filtros: FilterEmpresaArray, @Req() request: Request) {
    return this.empresasService.findAll(paginationEmpresa, filtros, request);
  }

  @Get('findAllEmpresaByUser')
  @ApiOperation({ summary: `Devuelve una lista de TODOS los ${name} de un Usuario - se usa el Token` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Aptitudes', type: [SwaggerEmpresasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna - empresa/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'empresa', required: false, type: String, description: 'Busqueda por este campo' })
  findAllEmpresaByUserToken(@Query() paginationEmpresa: PaginationEmpresaDto, @Req() request: Request) {
    return this.empresasService.findAllEmpresaByUserToken(paginationEmpresa, request);
  }

  @Get('findOneEmpresa/:id')
  @ApiOperation({ summary: `Devuelve un objeto de la Empresa y 3 campos mas , numeroDeofertas = total de ofertas vinculadas , empresaSeguida = si el usuario ha seguido a esta empresa , seguidoTotal = todas las empresas a las que ha seguido el usuario , usar el TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.empresasService.findOne(+id, request);
  }



  @Get('findAllValoraciones/:empresaId')
  @ApiOperation({ summary: `Devuelve un objeto de la Empresa cons us valoraciones ` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'empresaId', type: String, description: `ID de la ${name}` })
  findAllValoraciones(@Param('empresaId') empresaId: string) {
    return this.empresasService.findAllValoraciones(+empresaId);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  update(@Param('id') id: string, @Body() updateEmpresaDto: UpdateEmpresaDto, @Req() request: Request) {
    return this.empresasService.update(+id, updateEmpresaDto, request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: `ID de la ${name}` })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.empresasService.remove(+id, request);
  }


  @Post("login")
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  loginEmpresas(@Body() login: LoginDto, @Req() request: Request) {
    return this.empresasService.loginEmpresas(login, request);
  }

  @Get('findAllSameSector/:empresaId')
  @ApiOperation({ summary: `Extraemos todas las empresas que tengan el mismo sector a la empresaId` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna - empresa/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'empresa', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'empresaId', type: String, description: `ID de la ${name}` })
  findAllSameSector(@Param('empresaId') empresaId: string ,@Query() paginationEmpresa: PaginationEmpresaDto) {
    return this.empresasService.findAllSameSector(+empresaId , paginationEmpresa);
  }
  @Get('findAllBySector/:empresaId')
  @ApiOperation({ summary: `Extraemos todas las empresas que tengan el mismo sector a la empresaId` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna - empresa/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type: String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'empresa', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'empresaId', type: String, description: `ID del sector` })
  findAllBySector(@Param('empresaId') empresaId: string , @Query() paginationEmpresa: PaginationEmpresaDto) {
    return this.empresasService.findAllBySector(+empresaId , paginationEmpresa);
  }


  @Get('findAllValoracionesDetails/:empresaId')
  @ApiOperation({ summary: `Devuelve un objeto de la Empresa cons sus valoraciones , AQUI entramos en mas detalles - usuario-persona ` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'empresaId', type: String, description: `ID de la ${name}` })
  findAllValoracionesDetails(@Param('empresaId') empresaId: string) {
    return this.empresasService.findAllValoracionesDetails(+empresaId);
  }


  @Get('findAlllastInscritosEmpresaByToken')
  @ApiOperation({ summary: `Extraemos todos los inscritos a UNA EMPRESA , pasarle el token` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerEmpresasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  findAlllastInscritosEmpresaByToken(@Query() paginationEmpresa: PaginationEmpresaDto , @Req() request:Request) {
    return this.empresasService.findAlllastInscritosEmpresaByToken(paginationEmpresa , request);
  }
}
