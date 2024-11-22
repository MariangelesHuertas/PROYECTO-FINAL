import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsPortafoliosController } from './soft_skills_portafolios.controller';
import { SoftSkillsPortafoliosService } from './soft_skills_portafolios.service';

describe('SoftSkillsPortafoliosController', () => {
  let controller: SoftSkillsPortafoliosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftSkillsPortafoliosController],
      providers: [SoftSkillsPortafoliosService],
    }).compile();

    controller = module.get<SoftSkillsPortafoliosController>(SoftSkillsPortafoliosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
