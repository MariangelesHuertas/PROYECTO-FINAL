import { forwardRef, Module } from '@nestjs/common';
import { AuditoriasService } from './auditorias.service';
import { AuditoriasController } from './auditorias.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';

@Module({
  imports:[PrismaModule, 
     CommonModule],
  providers: [AuditoriasService, PrismaService, DatabaseErrorService ],
  controllers: [AuditoriasController],
  exports: [AuditoriasService],
})
export class AuditoriasModule {}
