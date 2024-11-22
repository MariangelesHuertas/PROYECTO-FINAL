import { Test, TestingModule } from '@nestjs/testing';
import { ValoracionesEmpresasController } from './valoraciones_empresas.controller';
import { ValoracionesEmpresasService } from './valoraciones_empresas.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';

describe('ValoracionesEmpresasController', () => {
  let controller: ValoracionesEmpresasController;
  let service: ValoracionesEmpresasService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
  
      controllers: [ValoracionesEmpresasController],
      providers: [{
        provide: ValoracionesEmpresasService,
        useValue: {
          createOrUpdate: jest.fn(),
          findByUser: jest.fn(),
          update: jest.fn(),
         
        },
      },],
    }).compile();

    controller = module.get<ValoracionesEmpresasController>(ValoracionesEmpresasController);
    service = module.get<ValoracionesEmpresasService>(ValoracionesEmpresasService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const name = "VALORACIONES-EMPRESAS-ctrl"
  const objeto = {
    id: 1,
    empresa_id: 1,
    usuario_id: 1,
    valoracion: 3,
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
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdate').mockResolvedValue(responseFormat);
      const result = await controller.create(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.createOrUpdate).toHaveBeenCalledWith(rest , request)
    });
  });

  describe('findByUser', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findByUser').mockResolvedValue(responseFormat);
      const result = await controller.findByUser('1')
      expect(result).toEqual(responseFormat);
      expect(service.findByUser).toHaveBeenCalledWith(1)
    });
  });

});
