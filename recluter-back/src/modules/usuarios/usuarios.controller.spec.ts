import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';
import { JwtService } from '@nestjs/jwt';
import { PaginationUsuarioDto } from './dto/pagination-usuario.dto';
import { EmailService } from '../../email/email.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EmailModule } from '../../email/email.module';
import { Request } from 'express';
describe('UsuariosController', () => {
    let controller: UsuariosController;
    let usuariosService: UsuariosService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsuariosController],
            imports:[EmailModule ,MailerModule],
            providers: [
                EmailService,
                PrismaService,
                DatabaseErrorService,
                JwtService,
                {
                    provide: UsuariosService,
                    useValue: {
                        create: jest.fn(),
                        findAll: jest.fn(),
                        update: jest.fn(),
                        login: jest.fn()
                    },
                },
                MailerModule
            ],
        }).compile();

        controller = moduleRef.get<UsuariosController>(UsuariosController);
        usuariosService = moduleRef.get<UsuariosService>(UsuariosService);
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
        estado:"confirmar",
        codigo_generado:2323,
        email:"usuario@gmail.com",
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
            const result = await controller.create(rest , request);
            expect(result).toEqual(responseFormat);
            expect(usuariosService.create).toHaveBeenCalledWith(rest, request);
        });
    });

    describe('findAll', () => {
        it(`should return an array of ${name}`, async () => {
            const usuarios = [{
                usuario: "usario.123",
                tipo_usuario_id: "viriliter"
            }];
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', usuarios);
            jest.spyOn(usuariosService, 'findAll').mockResolvedValue(responseFormat);
            const result = await controller.findAll(pagination);
            expect(result).toEqual(responseFormat);
            expect(usuariosService.findAll).toHaveBeenCalled();
        });
    });

    describe('update', () => {
        it(`should update an  exiting ${name}`, async () => {
            const { id, createdAt, updatedAt, ...rest } = objeto
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
            jest.spyOn(usuariosService, 'update').mockResolvedValue(responseFormat);
            const result = await controller.update('152', rest, request)
            expect(result).toEqual(responseFormat); 
            expect(usuariosService.update).toHaveBeenCalledWith(152, rest, request);
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
            const { id, createdAt, updatedAt, usuario, ...rest } = usuar.user
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [usuar]);
            jest.spyOn(usuariosService, 'login').mockResolvedValue(responseFormat);
            const login = {
                usuario: usuario,
                contrasena: "asdfasdfas"
            }
            const result = await controller.login(login , request)
            expect(result).toEqual(responseFormat);
            expect(usuariosService.login).toHaveBeenCalledWith(login, request);
        });

    });
});
