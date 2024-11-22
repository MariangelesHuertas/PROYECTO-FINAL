import { Module } from '@nestjs/common';
import { IdiomasUsuariosService } from './idiomas_usuarios.service';
import { IdiomasUsuariosController } from './idiomas_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [IdiomasUsuariosController],
  providers: [IdiomasUsuariosService],
})
export class IdiomasUsuariosModule {}
