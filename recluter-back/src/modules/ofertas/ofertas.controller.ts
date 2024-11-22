import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { CreateOfertaDto } from './dto/create-oferta.dto';
import { UpdateOfertaDto } from './dto/update-oferta.dto';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerOfertasDto } from './dto/Swagger-ofertas.dto';
import { SwaggerResponseFormatDto } from '../../common/Error/dto/swagger-responseError.dto';
import { PaginationOfertasDto } from './dto/pagination-ofertas.dto';
import { Request } from 'express';
import { FilterOfertas } from './dto/filter-oferta.dto';
const name = "- Ofertas - "
@ApiTags("Endpoints - Ofertas")
@Controller('ofertas')
export class OfertasController {
  constructor(private readonly ofertasService: OfertasService) {}

  @Post()
  @ApiOperation({ summary: `Crear una ${name}` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerOfertasDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createOfertaDto: CreateOfertaDto, @Req() request: Request) {
    return this.ofertasService.create(createOfertaDto , request);
  }

  @Get("findAllRecomendacionesByUser")
  @ApiOperation({ summary: `Devuelve una lista de ${name} , IMPORTANTE , por defecto se esta ordenando en el campo createdAt  - desc` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  findAllRecomendacionesByUser(@Query() paginationOferta:PaginationOfertasDto , @Body() filter:FilterOfertas , @Req() request?:Request) {
    return this.ofertasService.findAllRecomendacionesByUser(paginationOferta , filter  , request);
  }

  
  @Get()
  @ApiOperation({ summary: `Devuelve una lista de ${name} , IMPORTANTE , por defecto se esta ordenando en el campo createdAt  - desc` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  findAll(@Query() paginationOferta:PaginationOfertasDto , @Body() filter:FilterOfertas , @Req() request?:Request) {
    return this.ofertasService.findAll(paginationOferta , filter  , request);
  }




  @Get(':idEmpresa/getAllByEmpresaId')
  @ApiOperation({ summary: `Devuelve una lista de ${name} en base a el ID_EMPRESA` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas en base al ID DE LA EMPRESA', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo - ubi_provincia - ubi_poblacion' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'idEmpresa', required: true, type: String, description: `Ingresa el ID ${name}` })
  getAllByEmpresaId(@Param('idEmpresa') idEmpresa: string , @Query() paginationOferta:PaginationOfertasDto) {
    return this.ofertasService.getAllByEmpresaId(+idEmpresa , paginationOferta);
  }


  @Get('getAllByEmpresaByToken')
  @ApiOperation({ summary: `Devuelve una lista de ${name} en base a el ID_EMPRESA` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas en base al ID DE LA EMPRESA', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo - ubi_provincia - ubi_poblacion' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiParam({ name: 'idEmpresa', required: true, type: String, description: `Ingresa el ID ${name}` })
  getAllByEmpresaByToken( @Query() paginationOferta:PaginationOfertasDto , @Req() request:Request) {
    return this.ofertasService.getAllByEmpresaByToken( paginationOferta , request);
  }

  @Get(':id/byUser')
  @ApiOperation({ summary: `Devuelve un json en base al ID de ${name} , PASARLE EL TOKEN` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerOfertasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la Oferta' })
  findOne(@Param('id') id: string, @Req() request: Request) {
    return this.ofertasService.findOne(+id ,request);
  }

  @Patch(':id')
  @ApiOperation({ summary: `Devuelve un json con ${name} actualizado` })
  @ApiResponse({ status: 200, description: 'Devuelve una json ', type: SwaggerOfertasDto })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la Oferta' })
  update(@Param('id') id: string, @Body() updateOfertaDto: UpdateOfertaDto, @Req() request: Request) {
    return this.ofertasService.update(+id, updateOfertaDto , request);
  }

  @Delete(':id')
  @ApiOperation({ summary: `Eliminar una ${name}` })
  @ApiResponse({ status: 200, description: 'Devuelve una json con el objeto eliminado', type: SwaggerOfertasDto})
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'id', type: String, description: 'ID de la Oferta' })
  remove(@Param('id') id: string, @Req() request: Request) {
    return this.ofertasService.remove(+id , request);
  }



  
  @Patch('changeFieldBorrador/:idOferta')
  @ApiOperation({ summary: `Actualizar el campo BORRADOR de  ${name} a su valor contrario actual , true o false` })
  @ApiResponse({ status: 200, description: 'Devuelve un json con el objeto actualizado', type: SwaggerOfertasDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idOferta', type: String, description: 'ID de la Oferta' })
  changeFieldBorrador(@Param('idOferta') idOferta: string) {
    return this.ofertasService.changeFieldBorrador(+idOferta );
  }


  @Patch('changeFieldFinalizado/:idOferta')
  @ApiOperation({ summary: `Actualizar el campo FINALIZADO de  ${name} a TRUE, true o false , si es TRUE el campo BORRADOR pasa a ser FALSE` })
  @ApiResponse({ status: 200, description: 'Devuelve un json con el objeto actualizado', type: SwaggerOfertasDto })
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  @ApiParam({ name: 'idOferta', type: String, description: 'ID de la Oferta' })
  changeFieldFinalizado(@Param('idOferta') idOferta: string) {
    return this.ofertasService.changeFieldFinalizado(+idOferta );
  }

  @Get("findAllStateBorradorToken")
  @ApiOperation({ summary: `se obtendra las ofertas relacionadas a la primera empresa vinculada al usuario  , pasar el TOKEN ,  devuelve una lista de ${name} que tenga el BORRADOR = TRUE y FINALIZADO = FALSE` })
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  findAllStateBorradorToken(@Query() paginationOferta:PaginationOfertasDto, @Req() request: Request) {
    return this.ofertasService.findAllStateBorradorToken(paginationOferta , request);
  }

  @Get("findAllStateFinalizadoToken")
  @ApiOperation({ summary: `se obtendra las ofertas relacionadas a la primera empresa vinculada al usuario  , pasar el TOKEN , devuelve una lista de ${name} que tenga el FINALIZADO = TRUE Y BORRADOR = FALSE`})
  @ApiResponse({ status: 200, description: 'Devuelve una lista de Ofertas', type: [SwaggerOfertasDto] })
  @ApiResponse({ status: 400, description: 'Error al hacer la consulta', type: SwaggerResponseFormatDto })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Numero de resultados por pagina' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Numero de pagina' })
  @ApiQuery({ name: 'sortColumn', required: false, type: String, description: 'Ordena por columna  - cargo/string' })
  @ApiQuery({ name: 'sortOrder', required: false, type:String, description: 'Ordena asc/desc' })
  @ApiQuery({ name: 'cargo', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'sector', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_poblacion', required: false, type: String, description: 'Busqueda por este campo' })
  @ApiQuery({ name: 'ubi_provincia', required: false, type: String, description: 'Busqueda por este campo' })
  findAllStateFinalizadoToken(@Query() paginationOferta:PaginationOfertasDto, @Req() request: Request) {
    return this.ofertasService.findAllStateFinalizadoToken(paginationOferta , request);
  }


}
