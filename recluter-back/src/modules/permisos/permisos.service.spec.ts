import { Test } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { PermisosService } from './permisos.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { editPermiso, PaginationPermisoDto } from './dto';
import { Request } from 'express';
describe('PermisosService', () => {
  let prismaService: PrismaService;
  let permisosService: PermisosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
  
        PrismaService,
        DatabaseErrorService,
        {
          provide: PermisosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            /* update: jest.fn(), */
            editPermiso: jest.fn(),
          },
        },
      ],
    }).compile();
    permisosService = moduleRef.get<PermisosService>(PermisosService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  const name = "PERMISOS-svc"
  const pagination: PaginationPermisoDto = {
    limit: 10,
    page: 1,
    slug: "descuento",
    descripcion:"descripcion",
    sortColumn: "cargo",
    sortOrder: "asc"
  }
  const objeto = {
    tipo_permiso_id: 24,
    id: 163,
    slug: "templum-deorsum",
    ruta: "/usuarios",
    descripcion: "Victoria tibi a",
    createdAt: "2024-07-08T22:31:43.483Z",
    updatedAt: "2024-07-08T22:31:43.483Z"
  }

  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;


  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const {id , createdAt , updatedAt  , ...rest} = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(permisosService, 'create').mockResolvedValue(responseFormat);
      const result = await permisosService.create(rest, request);
      expect(result).toEqual(responseFormat);
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
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', permisos);

      jest.spyOn(permisosService, 'findAll').mockImplementation(() => Promise.resolve(responseFormat));

      const result = await permisosService.findAll(pagination);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAOne', () => {
    it(`should return a single ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(permisosService, 'findOne').mockImplementation(() => Promise.resolve(responseFormat));
      const result = await permisosService.findOne(objeto.id)
      expect(result).toEqual(responseFormat);
    });
  });
  /* describe('update', () => {
    it(`should update an  exiting ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(permisosService, 'update').mockResolvedValue(responseFormat);
      const result = await permisosService.update(objeto.id, rest, request)
      expect(result).toEqual(responseFormat);
    });
  }); */
  describe('editPermiso', () => {
    it(`should update an existing ${name}`, async () => {
      const editPermiso = {
        id: 1,
        tipo_permiso_id: 2
      }
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(permisosService, 'editPermiso').mockResolvedValue(responseFormat);
      const result = await permisosService.editPermiso(editPermiso, request)
      expect(result).toEqual(responseFormat);
    });
  });

});
