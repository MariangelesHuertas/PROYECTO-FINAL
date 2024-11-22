import { Test, TestingModule } from '@nestjs/testing';
import { ExperienciasLaboralesUsuariosController } from './experiencias_laborales_usuarios.controller';
import { ExperienciasLaboralesUsuariosService } from './experiencias_laborales_usuarios.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('ExperienciasLaboralesUsuariosController', () => {
  let controller: ExperienciasLaboralesUsuariosController;
  let service: ExperienciasLaboralesUsuariosService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [ExperienciasLaboralesUsuariosController],
      providers: [{
        provide: ExperienciasLaboralesUsuariosService,
        useValue: {
          create: jest.fn(),
          findByUser: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<ExperienciasLaboralesUsuariosController>(ExperienciasLaboralesUsuariosController);
    service = module.get<ExperienciasLaboralesUsuariosService>(ExperienciasLaboralesUsuariosService);
  });

  const name = "Experiencia-Laborales-Usuarios-ctrl"

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

  describe('findByUser', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findByUser').mockResolvedValue(responseFormat);
      const result = await controller.findByUser('1')
      expect(result).toEqual(responseFormat);
      expect(service.findByUser).toHaveBeenCalledWith(1)
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
