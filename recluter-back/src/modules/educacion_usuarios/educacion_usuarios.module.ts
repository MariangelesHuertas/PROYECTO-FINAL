import { Module } from '@nestjs/common';
import { EducacionUsuariosService } from './educacion_usuarios.service';
import { EducacionUsuariosController } from './educacion_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [EducacionUsuariosController],
  providers: [EducacionUsuariosService],
})
export class EducacionUsuariosModule {}
