import { Test, TestingModule } from '@nestjs/testing';
import { ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { TipoPermisosController } from './tipo_permisos.controller';
import { TipoPermisosService } from './tipo_permisos.service';
import { CreatePermisoDto } from '../permisos/dto';
import { CreateTipoPermisoDto } from './dto/create-tipo_permiso.dto';
import { UpdateTipoPermisoDto } from './dto/update-tipo_permiso.dto';
import { Request } from 'express';
describe('PermisosController', () => {
  let controller: TipoPermisosController;
  let service: TipoPermisosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoPermisosController],
      providers: [
        {
          provide: TipoPermisosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<TipoPermisosController>(TipoPermisosController);
    service = module.get<TipoPermisosService>(TipoPermisosService);
  });
  const name = "TIPO_PERMISO-ctrl"
  const objeto = {
    id: 31,
    tipo: "administrador5",
    createdAt: "2024-07-10T04:18:52.316Z",
    updatedAt: "2024-07-10T04:18:52.316Z"
  };
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;


  describe('create', () => {
    it(`should create a new ${name}`, async () => {

      const { tipo, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const newDto: CreateTipoPermisoDto = {
        tipo: "nuevo"
      }
      const result = await controller.create(newDto , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(newDto, request);
    });
  });
  describe('update', () => {
    it(`should update an  exiting ${name}`, async () => {
      const { id, tipo } = objeto;
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const updateDto: UpdateTipoPermisoDto = {
        tipo: tipo
      };
      const result = await controller.update('31', updateDto , request);
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(31, updateDto, request);
    });
  });


})