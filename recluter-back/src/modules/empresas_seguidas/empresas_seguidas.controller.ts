import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { EmpresasSeguidasService } from './empresas_seguidas.service';
import { CreateEmpresasSeguidaDto } from './dto/create-empresas_seguida.dto';
import { UpdateEmpresasSeguidaDto } from './dto/update-empresas_seguida.dto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SwaggerEmpresasSeguidasDto } from './dto/swagger-empresas_seguida.dto';
import { SwaggerResponseFormatDto } from 'src/common/Error/dto/swagger-responseError.dto';

@ApiTags("Endpoints - Empresas-Seguidas" )
@Controller('empresas-seguidas')
export class EmpresasSeguidasController {
  constructor(private readonly empresasSeguidasService: EmpresasSeguidasService) {}

  @Post()
  @ApiOperation({ summary: `Creamos o Eliminamos un registro , al pasarle el json se hace una busqueda , si este existe entonces se eliminara , caso contrario se creara un nuevo registro , pasarle TOKEN` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: SwaggerEmpresasSeguidasDto})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  create(@Body() createEmpresasSeguidaDto: CreateEmpresasSeguidaDto, @Req() request: Request) {
    return this.empresasSeguidasService.create(createEmpresasSeguidaDto , request);
  }

  @Get("findAllSeguidosByUser")
  @ApiOperation({ summary: `Mostramos todas las empresas seguidas de un usuario , pasarle el TOKEN` })
  @ApiResponse({ status: 201, description: 'Devuelve un json con el objeto creado', type: [SwaggerEmpresasSeguidasDto]})
  @ApiResponse({ status: 400, description: 'Devuelve un json Vacio con el error', type: SwaggerResponseFormatDto })
  findAllSeguidosByUser(@Req() request: Request){
    return this.empresasSeguidasService.findAllSeguidosByUser(request)
  }
}
