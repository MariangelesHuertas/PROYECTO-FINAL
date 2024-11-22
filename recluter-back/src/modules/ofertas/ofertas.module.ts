import { Module } from '@nestjs/common';
import { OfertasService } from './ofertas.service';
import { OfertasController } from './ofertas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from 'src/modules/auditorias/auditorias.module';
import { PalabrasClaveOfertaModule } from '../palabras_clave_oferta/palabras_clave_oferta.module';
import { AptitudesOfertaModule } from '../aptitudes_oferta/aptitudes_oferta.module';
import { RecomendacionesModule } from '../recomendaciones/recomendaciones.module';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports:[HttpModule ,  PrismaModule , CommonModule , AuditoriasModule , PalabrasClaveOfertaModule , AptitudesOfertaModule , RecomendacionesModule],
  controllers: [OfertasController],
  providers: [OfertasService],
})
export class OfertasModule {}
