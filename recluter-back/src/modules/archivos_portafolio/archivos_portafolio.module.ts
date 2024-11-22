import { Module } from '@nestjs/common';
import { ArchivosPortafolioService } from './archivos_portafolio.service';
import { ArchivosPortafolioController } from './archivos_portafolio.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[PrismaModule, CommonModule  , AuditoriasModule , ConfigModule],
  controllers: [ArchivosPortafolioController],
  providers: [ArchivosPortafolioService],
})
export class ArchivosPortafolioModule {}
