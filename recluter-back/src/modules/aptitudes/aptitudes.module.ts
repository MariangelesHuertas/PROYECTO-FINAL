import { Module } from '@nestjs/common';
import { AptitudesService } from './aptitudes.service';
import { AptitudesController } from './aptitudes.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [AptitudesController],
  providers: [AptitudesService],
})
export class AptitudesModule {}
