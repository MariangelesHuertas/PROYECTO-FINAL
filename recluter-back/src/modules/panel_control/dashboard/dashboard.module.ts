import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { ConfigModule } from '@nestjs/config';
import { AuditoriasModule } from 'src/modules/auditorias/auditorias.module';
import { CommonModule } from 'src/common/common.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule, CommonModule  , AuditoriasModule , ConfigModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
