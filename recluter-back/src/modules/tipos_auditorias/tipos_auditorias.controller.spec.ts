import { Test, TestingModule } from '@nestjs/testing';
import { TiposAuditoriasController } from './tipos_auditorias.controller';
import { TiposAuditoriasService } from './tipos_auditorias.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('TiposAuditoriasController', () => {
  let controller: TiposAuditoriasController;
  let service: TiposAuditoriasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TiposAuditoriasController],
      providers: [{
        provide: TiposAuditoriasService,
        useValue: {
          create: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<TiposAuditoriasController>(TiposAuditoriasController);
    service = module.get<TiposAuditoriasService>(TiposAuditoriasService);
  });

  const name = "Tipos-Auditoria-ctrl"

  const objeto = {
    id: 1,
    nombre: "nombre",
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
      const {id , createdAt , updatedAt, ...rest}= objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest );
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest)
    });
  });
});
