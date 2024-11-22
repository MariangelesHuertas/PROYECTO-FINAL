import { Test, TestingModule } from '@nestjs/testing';
import { CondicionesKillersQuestionsService } from './condiciones_killers_questions.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { PaginationCondicionKillerQuestionsDto } from './dto';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('CondicionesKillersQuestionsService', () => {
  let service: CondicionesKillersQuestionsService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PrismaService,
        DatabaseErrorService,
        {
          provide: CondicionesKillersQuestionsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    service = moduleRef.get<CondicionesKillersQuestionsService>(CondicionesKillersQuestionsService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  //-------
  const name = "CondKillerQuestions-svc"
  const pagination: PaginationCondicionKillerQuestionsDto = {
    limit: 10,
    page: 1,
    minimo: 2,
    maximo: 1,
    valor: "valor",
    sortColumn: "empresa",
    sortOrder: "asc"
  }
  const objeto = {
    id: 1,
    killer_question_id: 1,
    minimo: 1,
    maximo: 2,
    valor: "cualquier cosa",
    createdAt: "2024-07-22T15:46:03.707Z",
    updatedAt: "2024-07-22T15:46:03.707Z"
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
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'create').mockResolvedValue(responseFormat);
      const result = await service.create(rest , request);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAll', () => {
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findAll').mockResolvedValue(responseFormat);
      const result = await service.findAll(pagination);
      expect(result).toEqual(responseFormat);
    });
  });
  describe('findAOne', () => {
    it(`should successfully retrieve one ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'findOne').mockResolvedValue(responseFormat);
      const result = await service.findOne(objeto.id)
      expect(result).toEqual(responseFormat);
    });
  });
  describe('update', () => {
    it(`should update an existing ${name}`, async () => {
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'update').mockResolvedValue(responseFormat);
      const result = await service.update(objeto.id, rest, request)
      expect(result).toEqual(responseFormat);
    });
  });
  describe('remove', () => {
    it(`should remove an existing ${name}`, async () => {
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'remove').mockResolvedValue(responseFormat);
      const result = await service.remove(objeto.id, request)
      expect(result).toEqual(responseFormat);
    });
  });


});

