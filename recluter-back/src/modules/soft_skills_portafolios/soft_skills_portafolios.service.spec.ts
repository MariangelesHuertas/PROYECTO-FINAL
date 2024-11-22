import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsPortafoliosService } from './soft_skills_portafolios.service';

describe('SoftSkillsPortafoliosService', () => {
  let service: SoftSkillsPortafoliosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftSkillsPortafoliosService],
    }).compile();

    service = module.get<SoftSkillsPortafoliosService>(SoftSkillsPortafoliosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
