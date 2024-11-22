import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosController } from './usuarios.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CommonModule } from 'src/common/common.module';
import { EmailModule } from 'src/email/email.module';
import { ConfigModule } from '@nestjs/config';
import { AuditoriasModule } from '../auditorias/auditorias.module';
import { GoogleStrategy } from './strategies/google.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleEmpresaStrategy } from './strategies/googleEmpresa.strategy';

@Module({
  imports: [PrismaModule,EmailModule ,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SEED,
      signOptions: { expiresIn: '2h' },
    })
    , AuditoriasModule
  ],
  controllers: [UsuariosController],
  providers: [UsuariosService,ConfigModule , GoogleStrategy , FacebookStrategy , GoogleEmpresaStrategy],
  exports:[UsuariosService]
})
export class UsuariosModule { }
