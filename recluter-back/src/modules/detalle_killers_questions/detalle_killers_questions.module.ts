import { Module } from '@nestjs/common';
import { DetalleKillersQuestionsService } from './detalle_killers_questions.service';
import { DetalleKillersQuestionsController } from './detalle_killers_questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [DetalleKillersQuestionsController],
  providers: [DetalleKillersQuestionsService],
})
export class DetalleKillersQuestionsModule {}
