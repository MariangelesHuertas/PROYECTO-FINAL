import { Test, TestingModule } from '@nestjs/testing';
import { AuditoriasService } from './auditorias.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';

describe('AuditoriasService', () => {
  let service: AuditoriasService;
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [

        PrismaService,
        DatabaseErrorService, {
          provide: AuditoriasService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),

          }
        }
      ],
    }).compile();

    service = module.get<AuditoriasService>(AuditoriasService);
    prismaService = module.get<PrismaService>(PrismaService);

  });
  //-------
  const name = "Auditoria-svc"

  const objeto = {
    id: 1,
    tipo_auditoria_id: 1,
    usuario_id: 1,
    ip: "192.168.0.0",
    jsonentrada: "{}",
    jsonsalida: "",
    descripcion: "Descripción del cambio realizado",
    accion: "Actualizar",
    ruta: "/api/endpoint",
    log: "No se encontraron errores",
    tabla: "empresas",
    pk_actualizado: 1,
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
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await service.findAll();
      expect(result).toEqual(responseFormat);
    });
  });
});
