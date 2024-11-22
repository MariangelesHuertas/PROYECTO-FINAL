import { Module } from '@nestjs/common';
import { TiposAuditoriasService } from './tipos_auditorias.service';
import { TiposAuditoriasController } from './tipos_auditorias.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [TiposAuditoriasController],
  providers: [TiposAuditoriasService],
})
export class TiposAuditoriasModule {}
