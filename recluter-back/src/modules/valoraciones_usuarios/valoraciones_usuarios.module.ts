import { Module } from '@nestjs/common';
import { ValoracionesUsuariosService } from './valoraciones_usuarios.service';
import { ValoracionesUsuariosController } from './valoraciones_usuarios.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [ValoracionesUsuariosController],
  providers: [ValoracionesUsuariosService],
})
export class ValoracionesUsuariosModule {}
