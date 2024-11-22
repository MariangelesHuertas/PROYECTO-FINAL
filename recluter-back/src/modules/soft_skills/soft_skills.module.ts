import { Module } from '@nestjs/common';
import { SoftSkillsService } from './soft_skills.service';
import { SoftSkillsController } from './soft_skills.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [SoftSkillsController],
  providers: [SoftSkillsService],
})
export class SoftSkillsModule {}
