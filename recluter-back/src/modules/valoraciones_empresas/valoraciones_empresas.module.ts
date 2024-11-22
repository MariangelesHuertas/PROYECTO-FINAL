import { Module } from '@nestjs/common';
import { ValoracionesEmpresasService } from './valoraciones_empresas.service';
import { ValoracionesEmpresasController } from './valoraciones_empresas.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule  , AuditoriasModule],
  controllers: [ValoracionesEmpresasController],
  providers: [ValoracionesEmpresasService],
})
export class ValoracionesEmpresasModule {}
