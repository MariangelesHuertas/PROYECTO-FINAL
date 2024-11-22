import { Test, TestingModule } from '@nestjs/testing';
import { SoftSkillsUsuariosController } from './soft_skills_usuarios.controller';
import { SoftSkillsUsuariosService } from './soft_skills_usuarios.service';

describe('SoftSkillsUsuariosController', () => {
  let controller: SoftSkillsUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoftSkillsUsuariosController],
      providers: [SoftSkillsUsuariosService],
    }).compile();

    controller = module.get<SoftSkillsUsuariosController>(SoftSkillsUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
