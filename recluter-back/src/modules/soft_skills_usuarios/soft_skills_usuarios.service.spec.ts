import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsUsuariosService } from './soft_skills_usuarios.service';

describe('SoftSkillsUsuariosService', () => {
  let service: SoftSkillsUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoftSkillsUsuariosService],
    }).compile();

    service = module.get<SoftSkillsUsuariosService>(SoftSkillsUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
