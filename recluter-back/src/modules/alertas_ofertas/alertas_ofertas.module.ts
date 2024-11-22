import { Module } from '@nestjs/common';
import { AlertasOfertasService } from './alertas_ofertas.service';
import { AlertasOfertasController } from './alertas_ofertas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [AlertasOfertasController],
  providers: [AlertasOfertasService],
})
export class AlertasOfertasModule {}
