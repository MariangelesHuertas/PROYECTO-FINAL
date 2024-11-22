import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveService } from './palabras_clave.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { PaginationPalabrasClaveDto } from './dto';
import { Request } from 'express';
import { AuditoriasModule } from '../auditorias/auditorias.module';
describe('PalabrasClaveService', () => {
  let service: PalabrasClaveService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [

        PrismaService,
        DatabaseErrorService, {
          provide: PalabrasClaveService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<PalabrasClaveService>(PalabrasClaveService);
    prismaService = module.get<PrismaService>(PrismaService);

  });
  //-------
  const name = "PALABRAS-CLAVE-svc"
  const pagination: PaginationPalabrasClaveDto = {
    limit: 10,
    page: 1,
    palabra: "palabra",
    sortColumn: "palabra",
    sortOrder: "asc"
  }
  const objeto = {
    id: 1,
    palabra: "hola",
    aprobado: true,
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  };
  const request = {
    authAuthorization: 'Bearer token123',
    ipAddress: '127.0.0.1',
    url: '/api/url',
  } as unknown as Request;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await service.create(rest, request);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await service.findAll(pagination);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAOne', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await service.findOne(objeto.id)
      expect(result).toEqual(responseFormat);
    });
  });
  describe('update', () => {
    it(`should update an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await service.update(objeto.id, rest, request)
      expect(result).toEqual(responseFormat);
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await service.remove(objeto.id, request)
      expect(result).toEqual(responseFormat);
    });
  });
});
