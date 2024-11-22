import { Module } from '@nestjs/common';
import { PaisesService } from './paises.service';
import { PaisesController } from './paises.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [PaisesController],
  providers: [PaisesService],
})
export class PaisesModule {}
