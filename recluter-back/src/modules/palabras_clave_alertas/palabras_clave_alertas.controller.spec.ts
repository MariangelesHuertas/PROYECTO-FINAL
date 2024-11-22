import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveAlertasController } from './palabras_clave_alertas.controller';
import { PalabrasClaveAlertasService } from './palabras_clave_alertas.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PalabrasClaveAlertasController', () => {
  let controller: PalabrasClaveAlertasController;
  let service: PalabrasClaveAlertasService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [PalabrasClaveAlertasController],
      providers: [{
        provide: PalabrasClaveAlertasService,
        useValue: {
          createOrUpdate: jest.fn(),
          getAllByAlerta: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<PalabrasClaveAlertasController>(PalabrasClaveAlertasController);
    service = module.get<PalabrasClaveAlertasService>(PalabrasClaveAlertasService);

  });


  const name = "PalabraClaveAlerta-ctrl"
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
    expect(controller).toBeDefined();
  });
  describe('createOrUpdate', () => {
    it(`should createOrUpdate a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdate').mockResolvedValue(responseFormat);
      const result = await controller.createOrUpdate(rest, request);
      expect(result).toEqual(responseFormat);
      expect(service.createOrUpdate).toHaveBeenCalledWith(rest, request)
    });
  });
  describe(' getAllByAlerta', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'getAllByAlerta').mockResolvedValue(responseFormat);
      const result = await controller. getAllByAlerta("1");
      expect(result).toEqual(responseFormat);
      expect(service. getAllByAlerta).toHaveBeenCalledWith(1)
    });
  });
});
