import { Module } from '@nestjs/common';
import { TiposPreguntasService } from './tipos_preguntas.service';
import { TiposPreguntasController } from './tipos_preguntas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [TiposPreguntasController],
  providers: [TiposPreguntasService],
})
export class TiposPreguntasModule {}
