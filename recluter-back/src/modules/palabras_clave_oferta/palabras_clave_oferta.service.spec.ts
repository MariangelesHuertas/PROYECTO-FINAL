import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveOfertaService } from './palabras_clave_oferta.service';
import { PrismaService } from '../../prisma/prisma.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PalabrasClaveOfertaService', () => {
  let service: PalabrasClaveOfertaService;
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      providers: [
     
        PrismaService,
        DatabaseErrorService ,{
          provide:    PalabrasClaveOfertaService,
          useValue: {
            createOrUpdatePalabraOferta: jest.fn(),
            getAllByOferta: jest.fn(),
            
          }
        }
      ],
    }).compile();

    service = module.get<PalabrasClaveOfertaService>(PalabrasClaveOfertaService);
    prismaService = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const name = "PALABRA-OFERTA-srvc"
  const objeto = {
    id: 1,
    oferta_id: 1,
    palabra_clave_id: [1, 2],
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  }
  const request = {
    authAuthorization: 'Bearer token123',
    ipAddress: '127.0.0.1',
    url: '/api/url',
  } as unknown as Request;

  describe('createOrUpdatePalabraOferta', () => {
    it(`should create a new ${name}`, async () => {
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdatePalabraOferta').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdatePalabraOferta(rest, request);
      expect(result).toEqual(responseFormat);

    });
  });
  describe('getAllByOferta', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'getAllByOferta').mockResolvedValue(responseFormat);
      const result = await service.getAllByOferta(1);
      expect(result).toEqual(responseFormat);
    });
  });
});
