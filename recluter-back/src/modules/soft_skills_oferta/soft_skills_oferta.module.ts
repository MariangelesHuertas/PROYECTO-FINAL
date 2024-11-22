import { Module } from '@nestjs/common';
import { SoftSkillsOfertaService } from './soft_skills_oferta.service';
import { SoftSkillsOfertaController } from './soft_skills_oferta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [SoftSkillsOfertaController],
  providers: [SoftSkillsOfertaService],
})
export class SoftSkillsOfertaModule {}
