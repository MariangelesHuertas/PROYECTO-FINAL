import { Module } from '@nestjs/common';
import { EmpresasService } from './empresas.service';
import { EmpresasController } from './empresas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { UsuariosModule } from '../usuarios/usuarios.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule , UsuariosModule],
  controllers: [EmpresasController],
  providers: [EmpresasService],
})
export class EmpresasModule {}
