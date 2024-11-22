import { Module } from '@nestjs/common';
import { SoftSkillsPortafoliosService } from './soft_skills_portafolios.service';
import { SoftSkillsPortafoliosController } from './soft_skills_portafolios.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],

  controllers: [SoftSkillsPortafoliosController],
  providers: [SoftSkillsPortafoliosService],
})
export class SoftSkillsPortafoliosModule {}
