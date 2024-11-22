import { Test, TestingModule } from '@nestjs/testing';
import { PostulacionesGuardadasService } from './postulaciones_guardadas.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PostulacionesGuardadasService', () => {
  let service: PostulacionesGuardadasService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService, {
          provide: PostulacionesGuardadasService,
          useValue: {
            create: jest.fn()
          }
        }],
    }).compile();

    service = module.get<PostulacionesGuardadasService>(PostulacionesGuardadasService);
    prisma = module.get<PrismaService>(PrismaService)
  });

  
  const name = "POSTULACION-GUARDADA-svc"
  const objeto = {
    id: 1,
    usuario_id: 1,
    oferta_id: 1,
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
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
});
