import { Test, TestingModule } from '@nestjs/testing';
import { AptitudesUsuariosController } from './aptitudes_usuarios.controller';
import { AptitudesUsuariosService } from './aptitudes_usuarios.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('AptitudesUsuariosController', () => {
  let controller: AptitudesUsuariosController;
  let service: AptitudesUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [AptitudesUsuariosController],
      providers: [{
        provide: AptitudesUsuariosService,
        useValue: {
          create: jest.fn(),
          findOne: jest.fn(),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<AptitudesUsuariosController>(AptitudesUsuariosController);
    service = module.get<AptitudesUsuariosService>(AptitudesUsuariosService);

  });


  const name = "Aptitudes-Usuarios-ctrl"

  const objeto = {
    id: 1,
    usuario_id: 2,
    aptitud_id: 4,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-07-26T00:00:00Z',
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
      const result = await controller.create(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest, request)
    });
  });

  describe('findOne', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await controller.findOne('1')
      expect(result).toEqual(responseFormat);
      expect(service.findOne).toHaveBeenCalledWith(1)
    });
  });

  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await controller.remove({usuario_id:1 , aptitude_id:2} , request)
      expect(result).toEqual(responseFormat);
      expect(service.remove).toHaveBeenCalledWith({usuario_id:1 , aptitude_id:2}, request)

    });
  });
});

