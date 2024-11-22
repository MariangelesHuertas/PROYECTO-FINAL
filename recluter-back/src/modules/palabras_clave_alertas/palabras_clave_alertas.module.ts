import { Module } from '@nestjs/common';
import { PalabrasClaveAlertasService } from './palabras_clave_alertas.service';
import { PalabrasClaveAlertasController } from './palabras_clave_alertas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],

  controllers: [PalabrasClaveAlertasController],
  providers: [PalabrasClaveAlertasService],
})
export class PalabrasClaveAlertasModule {}
