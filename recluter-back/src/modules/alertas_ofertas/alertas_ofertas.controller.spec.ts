import { Test, TestingModule } from '@nestjs/testing';
import { AlertasOfertasController } from './alertas_ofertas.controller';
import { AlertasOfertasService } from './alertas_ofertas.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { Request } from 'express';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
describe('AlertasOfertasController', () => {
  let controller: AlertasOfertasController;
  let service: AlertasOfertasService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [AlertasOfertasController],
      providers: [{
        provide: AlertasOfertasService,
        useValue: {
          create: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<AlertasOfertasController>(AlertasOfertasController);
    service = module.get<AlertasOfertasService>(AlertasOfertasService);

  });


  const name = "AlertaOferta-ctrl"

  const objeto = {
    id: 1,
    alerta_id: 1,
    oferta_id: 1,
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
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest, request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest, request)
    });
  });
});
