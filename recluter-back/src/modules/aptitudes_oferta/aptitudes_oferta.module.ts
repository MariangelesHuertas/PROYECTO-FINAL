import { Module } from '@nestjs/common';
import { AptitudesOfertaService } from './aptitudes_oferta.service';
import { AptitudesOfertaController } from './aptitudes_oferta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [AptitudesOfertaController],
  providers: [AptitudesOfertaService],
  exports:[AptitudesOfertaService]
})
export class AptitudesOfertaModule {}
