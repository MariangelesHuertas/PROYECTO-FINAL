import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveAlertasService } from './palabras_clave_alertas.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PalabrasClaveAlertasService', () => {
  let service: PalabrasClaveAlertasService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: PalabrasClaveAlertasService,
          useValue: {
            createOrUpdate: jest.fn(),
            getAllByAlerta: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get<PalabrasClaveAlertasService>(PalabrasClaveAlertasService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  //-------
  const name = "PalabraClaveAlerta-svc"
  const objeto = {
    id: 1,
    palabra_clave_id: [1,2],
    alerta_id: 1,
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  };
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createOrUpdate', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdate').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdate(rest, request);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('getAllByAlerta', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'getAllByAlerta').mockResolvedValue(responseFormat);
      const result = await service.getAllByAlerta(1);
      expect(result).toEqual(responseFormat);
    });
  });
});
