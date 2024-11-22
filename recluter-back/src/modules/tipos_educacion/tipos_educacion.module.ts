import { Module } from '@nestjs/common';
import { TiposEducacionService } from './tipos_educacion.service';
import { TiposEducacionController } from './tipos_educacion.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditoriaInterceptor } from '../auditorias/interceptors/auditoria.interceptor';
import { AuditoriasModule } from '../auditorias/auditorias.module';

@Module({
  imports:[PrismaModule , CommonModule , AuditoriasModule],

  controllers: [TiposEducacionController],
  providers: [TiposEducacionService , {
    provide: APP_INTERCEPTOR,
    useClass: AuditoriaInterceptor,
  }],
})
export class TiposEducacionModule {}
