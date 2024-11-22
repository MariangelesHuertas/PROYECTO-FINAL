import { Module } from '@nestjs/common';
import { AptitudesUsuariosService } from './aptitudes_usuarios.service';
import { AptitudesUsuariosController } from './aptitudes_usuarios.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [AptitudesUsuariosController],
  providers: [AptitudesUsuariosService],
})
export class AptitudesUsuariosModule {}
