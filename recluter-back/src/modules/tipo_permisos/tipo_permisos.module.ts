import { Module } from '@nestjs/common';
import { TipoPermisosService } from './tipo_permisos.service';
import { TipoPermisosController } from './tipo_permisos.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [TipoPermisosController],
  providers: [TipoPermisosService],
})
export class TipoPermisosModule {}
