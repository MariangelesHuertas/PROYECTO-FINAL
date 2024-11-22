import { Module } from '@nestjs/common';
import { EmpresasSeguidasService } from './empresas_seguidas.service';
import { EmpresasSeguidasController } from './empresas_seguidas.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [EmpresasSeguidasController],
  providers: [EmpresasSeguidasService],
})
export class EmpresasSeguidasModule {}
