import { Test, TestingModule } from '@nestjs/testing';
import { KillersQuestionsController } from './killers_questions.controller';
import { KillersQuestionsService } from './killers_questions.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CommonModule } from '../../common/common.module';
import { PaginationKillerQuestionDto } from './dto';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('KillersQuestionsController', () => {
  let controller: KillersQuestionsController;
  let service: KillersQuestionsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, CommonModule],
      controllers: [KillersQuestionsController],
      providers: [{
        provide: KillersQuestionsService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },],
    }).compile();

    controller = module.get<KillersQuestionsController>(KillersQuestionsController);
    service = module.get<KillersQuestionsService>(KillersQuestionsService);

  });


  const name = "CondKillerQuestions-ctrl"
  const pagination: PaginationKillerQuestionDto = {
    limit: 10,
    page: 1,
    pregunta: "pregunta",
    sortColumn: "empresa",
    sortOrder: "asc"
  }
  const objeto = {
    id: 1,
    oferta_id: 1,
    tipo_pregunta_id: 1,
    pregunta: "pregunta ..",
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
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await controller.create(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.create).toHaveBeenCalledWith(rest, request)
    });
  });
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await controller.findAll(pagination);
      expect(result).toEqual(responseFormat);
      expect(service.findAll).toHaveBeenCalledWith(pagination)
    });
  });
  describe('findAOne', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await controller.findOne('1')
      expect(result).toEqual(responseFormat);
      expect(service.findOne).toHaveBeenCalledWith(1)
    });
  });
  describe('update', () => {
    it(`should update an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await controller.update('1', rest, request)
      expect(result).toEqual(responseFormat);
      expect(service.update).toHaveBeenCalledWith(1, rest, request)
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, createdAt, updatedAt, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await controller.remove('1', request)
      expect(result).toEqual(responseFormat);
      expect(service.remove).toHaveBeenCalledWith(1, request)

    });
  });
});
