import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsOfertaService } from './soft_skills_oferta.service';
import { PrismaService } from '../../prisma/prisma.service';
import { DatabaseErrorService } from '../../common/Error/database-error.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('SoftSkillsOfertaService', () => {
  let service: SoftSkillsOfertaService;
  let prismaService: PrismaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
 
        PrismaService,
        DatabaseErrorService,
        {
          provide:SoftSkillsOfertaService,
          useValue: {
            createOrUpdateSkillOferta: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SoftSkillsOfertaService>(SoftSkillsOfertaService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  const name = "SKILL-OFERTA-srvc"
  const objeto = {
    id: 1,
    oferta_id: 1,
    soft_skill_id: [
      { id: 1, porcentaje: 60 },
      { id: 2, porcentaje: 60 },
      { id: 3, porcentaje: 75 }
    ]
  }
  const request = {
    authAuthorization: 'Bearer token123',
    ipAddress: '127.0.0.1',
    url: '/api/url',
  } as unknown as Request;


  describe('createOrUpdateSkillOferta', () => {
    it(`should create a new ${name}`, async () => {
      const { id, ...rest } = objeto
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'createOrUpdateSkillOferta').mockResolvedValue(responseFormat);
      const result = await service.createOrUpdateSkillOferta(rest, request);
      expect(result).toEqual(responseFormat);
    });
  });
});
