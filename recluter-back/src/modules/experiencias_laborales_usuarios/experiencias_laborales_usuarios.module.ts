import { Module } from '@nestjs/common';
import { ExperienciasLaboralesUsuariosService } from './experiencias_laborales_usuarios.service';
import { ExperienciasLaboralesUsuariosController } from './experiencias_laborales_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [ExperienciasLaboralesUsuariosController],
  providers: [ExperienciasLaboralesUsuariosService],
})
export class ExperienciasLaboralesUsuariosModule {}
