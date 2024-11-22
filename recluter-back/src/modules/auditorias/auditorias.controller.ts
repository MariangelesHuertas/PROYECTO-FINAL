import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AuditoriasService } from './auditorias.service';
import { CreateAuditoriaDto } from './dto/create-auditoria.dto';
import { UpdateAuditoriaDto } from './dto/update-auditoria.dto';
import { BusquedaAuditoria } from './dto';

@Controller('auditorias')
export class AuditoriasController {
  constructor(private readonly auditoriasService: AuditoriasService) {}

  @Post()
  create(@Body() createAuditoriaDto: CreateAuditoriaDto) {
    return this.auditoriasService.create(createAuditoriaDto);
  }

   @Get()
  findAll() {
    return this.auditoriasService.findAll();
  }
  @Get("searchTablaUser")
  findTableUser(@Query() parametros:BusquedaAuditoria){
    console.log(parametros)
    return this.auditoriasService.findTableUser(parametros)
  }
/*
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.auditoriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuditoriaDto: UpdateAuditoriaDto) {
    return this.auditoriasService.update(+id, updateAuditoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.auditoriasService.remove(+id);
  } */
}
