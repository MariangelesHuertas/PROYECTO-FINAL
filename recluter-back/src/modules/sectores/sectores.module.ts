import { Module } from '@nestjs/common';
import { SectoresService } from './sectores.service';
import { SectoresController } from './sectores.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [SectoresController],
  providers: [SectoresService],
})
export class SectoresModule {}
