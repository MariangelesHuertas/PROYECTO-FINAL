import { Module } from '@nestjs/common';
import { NivelesIdiomasService } from './niveles_idiomas.service';
import { NivelesIdiomasController } from './niveles_idiomas.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [NivelesIdiomasController],
  providers: [NivelesIdiomasService],
})
export class NivelesIdiomasModule {}
