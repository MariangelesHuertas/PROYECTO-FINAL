import { Module } from '@nestjs/common';
import { IdiomasService } from './idiomas.service';
import { IdiomasController } from './idiomas.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [IdiomasController],
  providers: [IdiomasService],
})
export class IdiomasModule {}
