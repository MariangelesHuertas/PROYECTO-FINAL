import { Test, TestingModule } from '@nestjs/testing';
import { TipoUsuariosController } from './tipo_usuarios.controller';
import { TipoUsuariosService } from './tipo_usuarios.service';
import { CreateTipoUsuarioDto} from './dto/create-tipo_usuario.dto';
import { UpdateTipoUsuarioDto } from './dto/update-tipo_usuario.dto';

import { ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('TipoUsuariosController', () => {
  let controller: TipoUsuariosController;
  let service: TipoUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoUsuariosController],
      providers: [
        {
          provide: TipoUsuariosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TipoUsuariosController>(TipoUsuariosController);
    service = module.get<TipoUsuariosService>(TipoUsuariosService);
  });

  const tipoUsuario = {
    id: 31,
    tipo_usuario: 'seguridad',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const responseFormat: ResponseFormat = {
    respuesta: true,
    mensaje: 'Operacion Exitosa',
    data: [tipoUsuario],
    mensaje_dev: null,
    meta:[]
  };
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;

  describe('create', () => {
    it('should create a new tipo_usuario', async () => {
     
      const createDto: CreateTipoUsuarioDto = { tipo_usuario: 'seguridad' };
 
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(createDto , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(createDto, request);
    });
  });
  describe('findAll', () => {
    it('should return all tipo_usuarios', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await controller.findAll();
      expect(result).toEqual(responseFormat);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should update an existing tipo_usuario', async () => {
      const updateDto: UpdateTipoUsuarioDto = { tipo_usuario: 'seguridad' };
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await controller.update(String(tipoUsuario.id), updateDto, request);
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(tipoUsuario.id, updateDto, request);
    });
  });
});
