import { Module } from '@nestjs/common';
import { CvGeneralService } from './cv_general.service';
import { CvGeneralController } from './cv_general.controller';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule, CommonModule  , AuditoriasModule ],
  controllers: [CvGeneralController],
  providers: [CvGeneralService],
})
export class CvGeneralModule {}
