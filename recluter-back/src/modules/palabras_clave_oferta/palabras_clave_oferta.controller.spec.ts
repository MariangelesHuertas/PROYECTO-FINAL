import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveOfertaController } from './palabras_clave_oferta.controller';
import { PalabrasClaveOfertaService } from './palabras_clave_oferta.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PalabrasClaveOfertaController', () => {
  let controller: PalabrasClaveOfertaController;
  let service:PalabrasClaveOfertaService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PalabrasClaveOfertaController],
      providers: [
        PrismaService , 
        DatabaseErrorService,{
        provide: PalabrasClaveOfertaService,
        useValue: {
          createOrUpdatePalabraOferta: jest.fn(),
          getAllByOferta: jest.fn()
        }}],
    }).compile();

    controller = module.get<PalabrasClaveOfertaController>(PalabrasClaveOfertaController);
    service = module.get<PalabrasClaveOfertaService>(PalabrasClaveOfertaService)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const name = "PALABRA-OFERTA-ctrl"
  const objeto ={
    id:1,
    oferta_id: 1,
    palabra_clave_id:[1,2],
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
      const { id, createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdatePalabraOferta').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdatePalabraOferta(rest, request);
      expect(result).toEqual(responseFormat);
      expect(service.createOrUpdatePalabraOferta).toHaveBeenCalledWith(rest, request)

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
