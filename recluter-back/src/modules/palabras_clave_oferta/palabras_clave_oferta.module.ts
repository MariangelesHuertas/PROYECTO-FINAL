import { Module } from '@nestjs/common';
import { PalabrasClaveOfertaService } from './palabras_clave_oferta.service';
import { PalabrasClaveOfertaController } from './palabras_clave_oferta.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports: [PrismaModule, CommonModule, AuditoriasModule ],
  controllers: [PalabrasClaveOfertaController],
  providers: [PalabrasClaveOfertaService],
  exports:[PalabrasClaveOfertaService]
})
export class PalabrasClaveOfertaModule { }
