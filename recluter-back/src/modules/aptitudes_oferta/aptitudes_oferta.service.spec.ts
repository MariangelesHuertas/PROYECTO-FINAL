import { Test, TestingModule } from '@nestjs/testing';
import { AptitudesOfertaService } from './aptitudes_oferta.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { Request } from 'express';
describe('AptitudesOfertaService', () => {
  let service: AptitudesOfertaService;
  let prismaService: PrismaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AptitudesOfertaService,
        PrismaService,
        DatabaseErrorService,
        {
          provide: AptitudesOfertaService,
          useValue: {
            createOrUpdateAptitudeOferta: jest.fn(),
            getAllByOferta: jest.fn(),

          },
        },
      ],
    }).compile();

    service = module.get<AptitudesOfertaService>(AptitudesOfertaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const name = "APTITUDES-OFERTA-srvc"
  const objeto = {
    id: 1,
    oferta_id: 1,
    aptitud_id: [1, 2],
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  }
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;
  describe('createOrUpdateAptitudeOferta', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdateAptitudeOferta').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdateAptitudeOferta(rest , request);
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
