import { Module } from '@nestjs/common';
import {  DatabaseErrorService } from './Error/database-error.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuditoriasModule } from '../modules/auditorias/auditorias.module';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports:[PrismaModule],
  controllers: [],
  providers: [DatabaseErrorService],
  exports:[DatabaseErrorService]
})
export class CommonModule {}
