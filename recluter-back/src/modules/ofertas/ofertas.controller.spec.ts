import { Test, TestingModule } from '@nestjs/testing';
import { OfertasController } from './ofertas.controller';
import { OfertasService } from './ofertas.service';
import { CommonModule } from '../../common/common.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { PaginationOfertasDto } from './dto/pagination-ofertas.dto';
import { Request } from 'express';
describe('OfertasController', () => {
  let controller: OfertasController;
  let service: OfertasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({

      controllers: [OfertasController],
      providers: [{
        provide: OfertasService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        }
      }],
    }).compile();
    controller = module.get<OfertasController>(OfertasController);
    service = module.get<OfertasService>(OfertasService);
  });
  const name = "OFERTA-ctrl"
  const pagination: PaginationOfertasDto = {
    limit: 10,
    page: 1,
    cargo: "descuento",
    sortColumn: "cargo",
    sortOrder: "asc"
  }
  const objeto = {
    id: 1,
    empresa_id: 1,
    sector_id: 1,
    cargo: "inserte cargo",
    descripcion: "inserte descripcion",
    tipo: "inserte tipo",
    ubi_provincia: "inserte provincia",
    ubi_poblacion: "inserte poblacion",
    sal_min: 1000,
    sal_max: 2000,
    abanico_salarial: "inserte abanico salarial",
    anios_experiencia: 3,
    estudios_minimos: "inserte estudios minimos",
    tipo_contrato: "inserte tipo de contrato",
    jornada_laboral: "inserte jornada laboral",
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
      const { id,createdAt , updatedAt, ...rest } = objeto
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
  describe('findAOne', () => {
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
      const { id,createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await controller.update('1', rest, request)
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(1, rest, request)
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id,createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await controller.remove('1', request)
      expect(result).toEqual(responseFormat);
      expect(service.remove).toHaveBeenCalledWith(1, request)

    });
  });
});
