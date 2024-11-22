import { Module } from '@nestjs/common';
import { FasesPostulacionesService } from './fases_postulaciones.service';
import { FasesPostulacionesController } from './fases_postulaciones.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [FasesPostulacionesController],
  providers: [FasesPostulacionesService],
})
export class FasesPostulacionesModule {}
