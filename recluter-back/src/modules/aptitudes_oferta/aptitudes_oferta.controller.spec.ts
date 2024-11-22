import { Test, TestingModule } from '@nestjs/testing';
import { AptitudesOfertaController } from './aptitudes_oferta.controller';
import { AptitudesOfertaService } from './aptitudes_oferta.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';

describe('AptitudesOfertaController', () => {
  let controller: AptitudesOfertaController;
  let service: AptitudesOfertaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AptitudesOfertaController],
      providers: [{
        provide: AptitudesOfertaService,
        useValue: {
          createOrUpdateAptitudeOferta: jest.fn(),
          getAllByOferta: jest.fn()
        }
      }],
    }).compile();

    controller = module.get<AptitudesOfertaController>(AptitudesOfertaController);
    service = module.get<AptitudesOfertaService>(AptitudesOfertaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const name = "APTITUDES-OFERTA-ctrl"
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
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdateAptitudeOferta').mockResolvedValue(responseFormat);
      const result = await controller.createOrUpdateAptitudeOferta(rest, request);
      expect(result).toEqual(responseFormat);
      expect(service.createOrUpdateAptitudeOferta).toHaveBeenCalledWith(rest, request)
    });
  });
  describe('getAllByOferta', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'getAllByOferta').mockResolvedValue(responseFormat);
      const result = await controller.getAllByOferta('1');
      expect(result).toEqual(responseFormat);
      expect(service.getAllByOferta).toHaveBeenCalledWith(1)
    });
  });
});
