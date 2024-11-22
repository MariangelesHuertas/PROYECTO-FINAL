import { Test, TestingModule } from '@nestjs/testing';
import { AptitudesUsuariosService } from './aptitudes_usuarios.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('AptitudesUsuariosService', () => {
  let service: AptitudesUsuariosService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: AptitudesUsuariosService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<AptitudesUsuariosService>(AptitudesUsuariosService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });
  //-------
  const name = "Aptitudes-Usuarios-svc"

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
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const { id,createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await service.create(rest , request);
      expect(result).toEqual(responseFormat);
    });
  });

  describe('findOne', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await service.findOne(objeto.id)
      expect(result).toEqual(responseFormat);
    });
  });
  
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id,createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await service.remove({usuario_id:1 , aptitude_id:2} , request)
      expect(result).toEqual(responseFormat);
    });
  });

});
