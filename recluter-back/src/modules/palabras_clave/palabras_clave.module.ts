import { Module } from '@nestjs/common';
import { PalabrasClaveService } from './palabras_clave.service';
import { PalabrasClaveController } from './palabras_clave.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [PalabrasClaveController],
  providers: [PalabrasClaveService],
})
export class PalabrasClaveModule {}
