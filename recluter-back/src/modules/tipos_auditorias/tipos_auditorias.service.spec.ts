import { Test, TestingModule } from '@nestjs/testing';
import { TiposAuditoriasService } from './tipos_auditorias.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';

describe('TiposAuditoriasService', () => {
  let service: TiposAuditoriasService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [

        PrismaService,
        DatabaseErrorService, {
          provide: TiposAuditoriasService,
          useValue: {
            create: jest.fn(),

          }
        }
      ],
    }).compile();

    service = module.get<TiposAuditoriasService>(TiposAuditoriasService);
    prismaService = module.get<PrismaService>(PrismaService);

  });
  //-------
  const name = "PALABRAS-CLAVE-svc"
  const objeto = {
    id: 1,
    nombre: "hola",
    createdAt: "2024-07-08T15:56:45.032Z",
    updatedAt: "2024-07-08T15:56:45.032Z"
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await service.create(rest);
      expect(result).toEqual(responseFormat);
    });
  });
});
