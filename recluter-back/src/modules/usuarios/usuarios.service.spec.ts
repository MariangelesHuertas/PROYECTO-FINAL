import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';

import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { UsuariosService } from './usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PaginationUsuarioDto } from './dto/pagination-usuario.dto';
import { EmailService } from '../../email/email.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailModule } from '../../email/email.module';
import { Request } from 'express';
describe('UsuariosService', () => {
  let prismaService: PrismaService;
  let usuariosService: UsuariosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [EmailModule, MailerModule],
      providers: [

        PrismaService,
        DatabaseErrorService,
        JwtService,
        EmailService,
        {
          provide: UsuariosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),

            update: jest.fn(),
            login: jest.fn(),
          },
        },


      ],
    }).compile();
    usuariosService = moduleRef.get<UsuariosService>(UsuariosService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  const name = "USUARIO-ctrl"
  const pagination: PaginationUsuarioDto = {
    limit: 10,
    page: 1,
    usuario: "usuario",
    sortColumn: "usuario",
    sortOrder: "asc"
  }
  const objeto = {
    id: 163,
    nombre: "usuario1",
    apellido_paterno: "firstname",
    apellido_materno: "lasttname",
    usuario: "usario.123",
    contrasena: "password",
    tipo_usuario_id: 24,
    estado: "confirmar",
    codigo_generado: 2323,
    email: "usuario@gmail.com",
    createdAt: "2024-07-08T22:31:43.483Z",
    updatedAt: "2024-07-08T22:31:43.483Z"
  }
  const request = {
    authAuthorization: 'Bearer token123',
    ipAddress: '127.0.0.1',
    url: '/api/url',
  } as unknown as Request;
  describe('create', () => {
    it(`should create a new ${name}`, async () => {

      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(usuariosService, 'create').mockResolvedValue(responseFormat);
      const result = await usuariosService.create(rest, request);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAll', () => {
    it(`should return an array of ${name}`, async () => {
      const usuarios = [{
        usuario: "usario.123",
        tipo_usuario_id: "viriliter"
      }];
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', usuarios);

      jest.spyOn(usuariosService, 'findAll').mockImplementation(() => Promise.resolve(responseFormat));

      const result = await usuariosService.findAll(pagination);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('update', () => {
    it(`should update an  exiting ${name}`, async () => {

      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(usuariosService, 'update').mockResolvedValue(responseFormat);
      const result = await usuariosService.update(objeto.id, rest, request)
      expect(result).toEqual(responseFormat);
    });

  });
  describe('login', () => {
    it(`should return a single ${name}`, async () => {
      const usuar = {
        user: {
          id: 111,
          usuario: "usuario11",
          persona_id: 111,
          tipo_usuario_id: 24,
          createdAt: "2024-07-08T22:31:45.340Z",
          updatedAt: "2024-07-08T22:31:45.340Z"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6"
      };
      const { id, createdAt, updatedAt, usuario, ...rest } = usuar.user;

      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [usuar]);
      jest.spyOn(usuariosService, 'login').mockResolvedValue(responseFormat);

      const login = {
        usuario: usuario,
        contrasena: "contrasenia"
      }
      const result = await usuariosService.login(login, request)
      expect(result).toEqual(responseFormat);
    });
  });
})