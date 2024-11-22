import { Test, TestingModule } from '@nestjs/testing';
import { AuditoriasController } from './auditorias.controller';
import { AuditoriasService } from './auditorias.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';

describe('AuditoriasController', () => {
  let controller: AuditoriasController;
  let service: AuditoriasService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuditoriasController],
      providers: [{
        provide: AuditoriasService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<AuditoriasController>(AuditoriasController);
    service = module.get<AuditoriasService>(AuditoriasService);
  });


  const name = "Auditoria-ctrl"
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
    expect(controller).toBeDefined();
  });
  describe('create', () => {
    it(`should create a new ${name}`, async () => {
      const {id , createdAt , updatedAt, ...rest}= objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest );
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest)
    });
  });
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await controller.findAll();
      expect(result).toEqual(responseFormat);
      expect(service.findAll).toHaveBeenCalledWith()
    });
  });
});
