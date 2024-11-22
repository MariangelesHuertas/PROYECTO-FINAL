import { Test, TestingModule } from '@nestjs/testing';
import { AlertasController } from './alertas.controller';
import { AlertasService } from './alertas.service';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { PaginationAlertaDto } from './dto';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('AlertasController', () => {
  let controller: AlertasController;
  let service: AlertasService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [AlertasController],
      providers: [{
        provide: AlertasService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<AlertasController>(AlertasController);
    service = module.get<AlertasService>(AlertasService);

  });


  const name = "Alerta-ctrl"
  const pagination: PaginationAlertaDto = {
    limit: 10,
    page: 1,
    nombre: "nombre",
    cargo: "cargo",
    temporalidad: "temporalidad",
    sortColumn: "tipo",
    sortOrder: "asc"
  }
  const objeto = {
    id: 1,
    tipo_alerta_id:1,
    usuario_id:1,
    nombre: "nombre",
    cargo: "cargo",
    temporalidad: "temporalidad",
    activa:true,
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
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await controller.findAll(pagination);
      expect(result).toEqual(responseFormat);
      expect(service.findAll).toHaveBeenCalledWith(pagination)
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
  describe('update', () => {
    it(`should update an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await controller.update('1', rest, request)
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(1, rest, request)
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await controller.remove('1', request)
      expect(result).toEqual(responseFormat);
      expect(service.remove).toHaveBeenCalledWith(1, request)

    });
  });
});

