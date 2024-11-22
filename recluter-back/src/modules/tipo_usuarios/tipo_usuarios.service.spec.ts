import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';

import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { TipoUsuariosService } from './tipo_usuarios.service';
import { Request } from 'express';
describe('TiposUsuariosService', () => {
    let prismaService: PrismaService;
    let tipoUsuariosService: TipoUsuariosService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
          
                PrismaService,
                DatabaseErrorService,
                {
                    provide:       TipoUsuariosService,
                    useValue: {
                      create: jest.fn(),
                      findAll: jest.fn(),
     
                      update: jest.fn(),
           
                    },
                  },
            ],
        }).compile();
        tipoUsuariosService = moduleRef.get<TipoUsuariosService>(TipoUsuariosService);
        prismaService = moduleRef.get<PrismaService>(PrismaService);
    });

    const tipoUsuario = {
        id: 31,
        tipo_usuario: "seguridad",
        createdAt: "2024-07-10T05:12:36.743Z",
        updatedAt: "2024-07-10T05:12:36.743Z"
    };
    const request = {
        authAuthorization: 'Bearer token123',
        ipAddress: '127.0.0.1',
        url: '/api/url',
    } as unknown as Request;
    describe('create', () => {
        it('should create a new permiso', async () => {

            const { id, tipo_usuario, ...rest } = tipoUsuario
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [tipoUsuario]);
            jest.spyOn(tipoUsuariosService, 'create').mockResolvedValue(responseFormat);
            const result = await tipoUsuariosService.create({ tipo_usuario }, request);
            expect(result).toEqual(responseFormat);
        });
    });
    describe('findAll', () => {
        it('should create a new permiso', async () => {
            const { id, createdAt, updatedAt, ...rest } = tipoUsuario
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [tipoUsuario]);

            jest.spyOn(tipoUsuariosService, 'findAll').mockImplementation(() => Promise.resolve(responseFormat));

            const result = await tipoUsuariosService.findAll();
            expect(result).toEqual(responseFormat);
        });
    });
    describe('update', () => {
        it('should update an existing permiso', async () => {

            const { id, createdAt, updatedAt, ...rest } = tipoUsuario
            const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [tipoUsuario]);
            jest.spyOn(tipoUsuariosService, 'update').mockResolvedValue(responseFormat);
            const result = await tipoUsuariosService.update(tipoUsuario.id, rest, request)
            expect(result).toEqual(responseFormat);
        });
    });
})
