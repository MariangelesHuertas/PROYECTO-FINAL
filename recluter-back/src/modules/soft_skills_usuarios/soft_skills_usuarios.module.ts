import { Module } from '@nestjs/common';
import { SoftSkillsUsuariosService } from './soft_skills_usuarios.service';
import { SoftSkillsUsuariosController } from './soft_skills_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports: [PrismaModule, CommonModule, AuditoriasModule],
  controllers: [SoftSkillsUsuariosController],
  providers: [SoftSkillsUsuariosService],
})
export class SoftSkillsUsuariosModule { }
