import { Module } from '@nestjs/common';
import { PortafoliosUsuariosService } from './portafolios_usuarios.service';
import { PortafoliosUsuariosController } from './portafolios_usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, CommonModule  , AuditoriasModule , ConfigModule],
  controllers: [PortafoliosUsuariosController],
  providers: [PortafoliosUsuariosService],
})
export class PortafoliosUsuariosModule {}
