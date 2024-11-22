import { Test, TestingModule } from '@nestjs/testing';
import { EducacionUsuariosController } from './educacion_usuarios.controller';
import { EducacionUsuariosService } from './educacion_usuarios.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('EducacionUsuariosController', () => {
  let controller: EducacionUsuariosController;
  let service: EducacionUsuariosService
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducacionUsuariosController],
      providers: [{
        provide: EducacionUsuariosService,
        useValue: {
          create: jest.fn(),
          findByUser: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<EducacionUsuariosController>(EducacionUsuariosController);
    service = module.get<EducacionUsuariosService>(EducacionUsuariosService);
  });

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
