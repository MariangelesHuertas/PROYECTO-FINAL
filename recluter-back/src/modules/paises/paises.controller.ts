import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { CreatePaiseDto } from './dto/create-paise.dto';
import { UpdatePaiseDto } from './dto/update-paise.dto';
import { PaginationPaisesDto } from './dto/pagination-paises.dto';

@Controller('paises')
export class PaisesController {
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  create(@Body() createPaiseDto: CreatePaiseDto) {
    return this.paisesService.create(createPaiseDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationPaisesDto) {
    return this.paisesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paisesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaiseDto: UpdatePaiseDto) {
    return this.paisesService.update(+id, updatePaiseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paisesService.remove(+id);
  }
}
