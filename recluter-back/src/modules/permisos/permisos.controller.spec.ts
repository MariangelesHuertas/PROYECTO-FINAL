import { Test, TestingModule } from '@nestjs/testing';
import { PermisosController } from './permisos.controller';
import { PermisosService } from './permisos.service';
import {  editPermiso, PaginationPermisoDto } from './dto/index'
import { ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { formatResponseMessages } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PermisosController', () => {
  let controller: PermisosController;
  let service: PermisosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermisosController],
      providers: [
        {
          provide: PermisosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
           /*  update: jest.fn(), */
            editPermiso: jest.fn(),
           
          },
        },
      ],
    }).compile();

    controller = module.get<PermisosController>(PermisosController);
    service = module.get<PermisosService>(PermisosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const name = "PERMISOS-ctrl"
  const pagination: PaginationPermisoDto = {
    limit: 10,
    page: 1,
    slug: "descuento",
    descripcion:"descripcion",
    sortColumn: "cargo",
    sortOrder: "asc"
  }
  const objeto = {
    id: 163,
    tipo_permiso_id: 24,
    slug: "templum-deorsum",
    ruta: "/usuarios",
    descripcion: "Victoria tibi a",
    createdAt: "2024-07-08T22:31:43.483Z",
    updatedAt: "2024-07-08T22:31:43.483Z"
  };
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;


  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const {id , createdAt , updatedAt , ...rest} = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest, request);
    });
  });

  describe('findAll', () => {
    it(`should return an array of ${name}`, async () => {
      const permisos = [{
        id_tipo_permiso: 21,
        tipo_permiso: "voluntarius",
        permisos: [
          {
            id: 162,
            descripcion: "Curvo beatae ai",
            slug: "absum-adduco-de"
          },
        ],
      }];
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [permisos]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await controller.findAll(pagination);
      expect(result).toEqual(responseFormat);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it(`should return a single ${name}`, async () => {
      
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await controller.findOne('163');
      expect(result).toEqual(responseFormat);
      expect(service.findOne).toHaveBeenCalledWith(163);
    });
  });

/*   describe('update', () => {
    it(`should update an  exiting ${name}`, async () => {
      const {id , createdAt , updatedAt , ...rest} = objeto

      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await controller.update('1', rest, request);
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(1, rest, request);
    });
  }); */
  describe('editPermiso', () => {
    it(`should update an existing ${name}`, async () => {
      const editPermiso:editPermiso = {
        id: 1,
        tipo_permiso_id: 2
      }
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'editPermiso').mockResolvedValue(responseFormat);
      const result = await controller.editPermiso(editPermiso, request)
      expect(result).toEqual(responseFormat);
      expect(service.editPermiso).toHaveBeenCalledWith(editPermiso, request);
    });
  });
});
