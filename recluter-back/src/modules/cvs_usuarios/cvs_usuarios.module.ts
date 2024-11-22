import { Module } from '@nestjs/common';
import { CvsUsuariosService } from './cvs_usuarios.service';
import { CvsUsuariosController } from './cvs_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, CommonModule  , AuditoriasModule , ConfigModule],

  controllers: [CvsUsuariosController],
  providers: [CvsUsuariosService],
})
export class CvsUsuariosModule {}
