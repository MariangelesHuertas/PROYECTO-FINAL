import { Module } from '@nestjs/common';
import { RecomendacionesService } from './recomendaciones.service';
import { RecomendacionesController } from './recomendaciones.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [RecomendacionesController],
  providers: [RecomendacionesService],
  exports: [RecomendacionesService]
})
export class RecomendacionesModule {}
