import { Module } from '@nestjs/common';
import { PostulacionesGuardadasService } from './postulaciones_guardadas.service';
import { PostulacionesGuardadasController } from './postulaciones_guardadas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [PostulacionesGuardadasController],
  providers: [PostulacionesGuardadasService],
})
export class PostulacionesGuardadasModule {}
