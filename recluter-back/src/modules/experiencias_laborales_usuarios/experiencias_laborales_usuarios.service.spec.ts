import { Test, TestingModule } from '@nestjs/testing';
import { ExperienciasLaboralesUsuariosService } from './experiencias_laborales_usuarios.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('ExperienciasLaboralesUsuariosService', () => {
  let service: ExperienciasLaboralesUsuariosService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: ExperienciasLaboralesUsuariosService,
          useValue: {
            create: jest.fn(),
            findByUser: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<ExperienciasLaboralesUsuariosService>(ExperienciasLaboralesUsuariosService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  //-------
  const name = "Experiencia-Laborales-Usuarios-svc"

  const objeto = {
    id: 17,
    empresa_id: 9,
    usuario_id: 5,
    cargo: "Dsdfg",
    descripcion: "sdfg",
    nombre_empresa: "Vinum vorax str",
    fecha_inicio: new Date('2024-01-01T00:00:00Z'),
    fecha_fin: new Date('2024-12-31T00:00:00Z'),
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
      const { id, ...rest } = objeto
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
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await service.update(objeto.id, rest , request)
      expect(result).toEqual(responseFormat);
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await service.remove(objeto.id , request)
      expect(result).toEqual(responseFormat);
    });
  });

});
