import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AuditoriaInterceptor } from './modules/auditorias/interceptors/auditoria.interceptor';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /*  app.setGlobalPrefix('v1');
    */
  // CORS config
  app.enableCors({
    origin: ['http://localhost:3010' , 'http://localhost:3000'], // Permitir solicitudes desde el frontend
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], // Métodos permitidos
    credentials: true, // Habilitar envío de cookies o encabezados de autenticación
  });
  app.use('/storage', express.static(join(__dirname, '..', 'storage')));  
  app.useGlobalInterceptors(new (AuditoriaInterceptor));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  const config = new DocumentBuilder()
    .setTitle('Recluter-backend')
    .setDescription('Endpoints')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();
