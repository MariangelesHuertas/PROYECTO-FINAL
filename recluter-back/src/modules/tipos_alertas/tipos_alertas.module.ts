import { Module } from '@nestjs/common';
import { TiposAlertasService } from './tipos_alertas.service';
import { TiposAlertasController } from './tipos_alertas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [TiposAlertasController],
  providers: [TiposAlertasService],
})
export class TiposAlertasModule {}
