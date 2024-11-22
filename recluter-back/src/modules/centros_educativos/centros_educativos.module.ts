import { Module } from '@nestjs/common';
import { CentrosEducativosService } from './centros_educativos.service';
import { CentrosEducativosController } from './centros_educativos.controller';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],
  controllers: [CentrosEducativosController],
  providers: [CentrosEducativosService],
})
export class CentrosEducativosModule {}
