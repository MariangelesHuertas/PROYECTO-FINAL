import { Module } from '@nestjs/common';
import { KillersQuestionsService } from './killers_questions.service';
import { KillersQuestionsController } from './killers_questions.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[CommonModule , PrismaModule , AuditoriasModule],
  controllers: [KillersQuestionsController],
  providers: [KillersQuestionsService],
})
export class KillersQuestionsModule {}
