import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { CreateDashboardDto } from './dto/create-dashboard.dto';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { FilterInscritosOfertas } from './dto/filter-IncritosOferta.dto';
import { PaginationInscritosOfertaDto } from './dto/paginate-inscritosOferta.dto';
import { Request } from 'express';
import { PaginationInscritosDiaOfertaDto } from './dto/paginate-inscritosDiaOferta';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Endpoint - Panel-control / dashboard")
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}



  @Post('incritosOferta/:idOferta?')
  findAllInscritoOferta(@Param('idOferta') idOferta: string ,@Body() filter:FilterInscritosOfertas , @Query() paginate:PaginationInscritosOfertaDto , @Req() request:Request) {
    return this.dashboardService.findAllInscritoOferta(+idOferta , filter , paginate , request);
  }

  @Get('inscritosByDia/:idOferta?')
  finscritosByDia(@Param('idOferta') idOferta:string , @Query() paginate:PaginationInscritosDiaOfertaDto ,@Req() request:Request) {
    return this.dashboardService.inscritosByDia(+idOferta , paginate, request);
  }

  @Get('findAllInscritosOfertaGroupByFases')
  findAllInscritosOfertaGroupByFases( @Query() paginate:PaginationInscritosDiaOfertaDto ,@Req() request:Request) {
    return this.dashboardService.findAllInscritosOfertaGroupByFases(  request);
  }
}
