import { Test, TestingModule } from '@nestjs/testing';
import { ValoracionesUsuariosService } from './valoraciones_usuarios.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { ValoracionesEmpresasService } from '../valoraciones_empresas/valoraciones_empresas.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';

describe('ValoracionesUsuariosService', () => {
  let service: ValoracionesUsuariosService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: ValoracionesUsuariosService,
          useValue: {
            createOrUpdate: jest.fn(),
            findByUser: jest.fn(),
            update: jest.fn(),
           
          },
        },
      ],
    }).compile();

    service = module.get<ValoracionesUsuariosService>(ValoracionesUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const name = "VALORACIONES-USUARIOS-svc"
  const objeto = {
    id: 1,
    usuario_id: 1,
    valoracion: 1,
    usuarios: 3,
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  };
  const request = {
    authAuthorization: 'Bearer token123', 
    ipAddress: '127.0.0.1', 
    url: '/api/url', 
  } as unknown as Request;
  describe('createOrUpdate', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdate').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdate(rest , request);
      expect(result).toEqual(responseFormat);

    });
  });

  describe('findByUser', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findByUser').mockResolvedValue(responseFormat);
      const result = await service.findByUser(1)
      expect(result).toEqual(responseFormat);
      expect(service.findByUser).toHaveBeenCalledWith(1)
    });
  });
  /* describe('update', () => {
    it(`should update an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await service.update(1, rest)
      expect(result).toEqual(responseFormat);

    });
  }); */
});
