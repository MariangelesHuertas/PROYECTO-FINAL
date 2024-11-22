import { Module } from '@nestjs/common';
import { TipoUsuariosService } from './tipo_usuarios.service';
import { TipoUsuariosController } from './tipo_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule,CommonModule , AuditoriasModule],
  controllers: [TipoUsuariosController],
  providers: [TipoUsuariosService],
})
export class TipoUsuariosModule {}
