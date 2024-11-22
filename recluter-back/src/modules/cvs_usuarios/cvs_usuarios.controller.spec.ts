import { Test, TestingModule } from '@nestjs/testing';
import { CvsUsuariosController } from './cvs_usuarios.controller';
import { CvsUsuariosService } from './cvs_usuarios.service';

describe('CvsUsuariosController', () => {
  let controller: CvsUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvsUsuariosController],
      providers: [CvsUsuariosService],
    }).compile();

    controller = module.get<CvsUsuariosController>(CvsUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
