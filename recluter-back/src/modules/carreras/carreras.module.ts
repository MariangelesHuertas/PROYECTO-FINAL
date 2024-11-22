import { Module } from '@nestjs/common';
import { CarrerasService } from './carreras.service';
import { CarrerasController } from './carreras.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from 'src/modules/auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [CarrerasController],
  providers: [CarrerasService],
})
export class CarrerasModule {}
