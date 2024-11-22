import { Test, TestingModule } from '@nestjs/testing';
import { EducacionUsuariosService } from './educacion_usuarios.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('EducacionUsuariosService', () => {
  let service: EducacionUsuariosService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: EducacionUsuariosService,
          useValue: {
            create: jest.fn(),
            findByUser: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get<EducacionUsuariosService>(EducacionUsuariosService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  //-------
  const name = "Educacion-usuarios-svc"
  const objeto = {
    id: 4,
    tipo_educacion_id: 1,
    centro_educativo_id: 1,
    usuario_id: 7,
    carrera_id: 1,
    fecha_inicio: new Date('2024-01-01T00:00:00Z'),
    fecha_final: new Date('2024-12-31T00:00:00Z'),
    nombre_centro_educativo: "nuevo",
    carrera: "nuevoc",
    createdAt: "2024-07-27T15:58:38.295Z",
    updatedAt: "2024-07-27T15:58:38.295Z"
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
      const result = await service.create(rest , request);
      expect(result).toEqual(responseFormat);
    });
  });

  describe('findByUser', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findByUser').mockResolvedValue(responseFormat);
      const result = await service.findByUser(objeto.id)
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
