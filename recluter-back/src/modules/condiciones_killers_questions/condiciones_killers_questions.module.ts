import { Module } from '@nestjs/common';
import { CondicionesKillersQuestionsService } from './condiciones_killers_questions.service';
import { CondicionesKillersQuestionsController } from './condiciones_killers_questions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [CondicionesKillersQuestionsController],
  providers: [CondicionesKillersQuestionsService],
})
export class CondicionesKillersQuestionsModule {}
