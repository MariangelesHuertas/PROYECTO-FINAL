import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposAuditoriasService } from './tipos_auditorias.service';
import { CreateTiposAuditoriaDto } from './dto/create-tipos_auditoria.dto';
import { UpdateTiposAuditoriaDto } from './dto/update-tipos_auditoria.dto';

@Controller('tipos-auditorias')
export class TiposAuditoriasController {
  constructor(private readonly tiposAuditoriasService: TiposAuditoriasService) {}

  @Post()
  create(@Body() createTiposAuditoriaDto: CreateTiposAuditoriaDto) {
    return this.tiposAuditoriasService.create(createTiposAuditoriaDto);
  }

 /*  @Get()
  findAll() {
    return this.tiposAuditoriasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiposAuditoriasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiposAuditoriaDto: UpdateTiposAuditoriaDto) {
    return this.tiposAuditoriasService.update(+id, updateTiposAuditoriaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiposAuditoriasService.remove(+id);
  } */
}
