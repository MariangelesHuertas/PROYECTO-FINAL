import { Test, TestingModule } from '@nestjs/testing';
import { PostulacionesGuardadasController } from './postulaciones_guardadas.controller';
import { PostulacionesGuardadasService } from './postulaciones_guardadas.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('PostulacionesGuardadasController', () => {
  let controller: PostulacionesGuardadasController;
  let service: PostulacionesGuardadasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostulacionesGuardadasController],
      providers: [{
        provide:PostulacionesGuardadasService,
        useValue: {
          create: jest.fn(),
        }
      }],
    }).compile();

    controller = module.get<PostulacionesGuardadasController>(PostulacionesGuardadasController);
    service = module.get<PostulacionesGuardadasService>(PostulacionesGuardadasService);
 
  });

  const name = "POSTULACION-GUARDADA-ctrl"
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
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const { id,createdAt , updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest, request)
    });
  });
});
