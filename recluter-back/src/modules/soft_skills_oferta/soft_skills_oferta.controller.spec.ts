import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsOfertaController } from './soft_skills_oferta.controller';
import { SoftSkillsOfertaService } from './soft_skills_oferta.service';
import { formatResponseMessages, ResponseFormat } from '../../common/Error/interfaces/response.interface';
import { Request } from 'express';
describe('SoftSkillsOfertaController', () => {
  let controller: SoftSkillsOfertaController;
  let service: SoftSkillsOfertaService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftSkillsOfertaController],
      providers: [{
        provide: SoftSkillsOfertaService,
        useValue: {
          createOrUpdateSkillOferta: jest.fn(),
          getAllByOferta: jest.fn()
        }
      }],
    }).compile();

    controller = module.get<SoftSkillsOfertaController>(SoftSkillsOfertaController);
    service = module.get<SoftSkillsOfertaService>(SoftSkillsOfertaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  const name = "SKILL-OFERTA-ctrl"
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
      const result = await controller.createOrUpdateSkillOferta(rest , request);
      expect(result).toEqual(responseFormat);
      expect(service.createOrUpdateSkillOferta).toHaveBeenCalledWith(rest, request)
    });
  });
  describe('getAllByOferta', () => {
    const objeto = {
      id: 1,
      oferta_id: 1,
      soft_skill_id: 1,
      porcentaje:2,
      createdAt: "2024-07-08T15:56:45.032Z",
      updatedAt: "2024-07-08T15:56:45.032Z"
    }
    it(`should successfully retrieve all ${name}`, async () => {
      const responseFormat: ResponseFormat = formatResponseMessages(true, 'Operacion Exitosa', [objeto]);
      jest.spyOn(service, 'getAllByOferta').mockResolvedValue(responseFormat);
      const result = await controller.getAllByOferta('1');
      expect(result).toEqual(responseFormat);
      expect(service.getAllByOferta).toHaveBeenCalledWith(1)
    });
  });
});
