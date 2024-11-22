import { Test, TestingModule } from '@nestjs/testing';
import { IdiomasUsuariosController } from './idiomas_usuarios.controller';
import { IdiomasUsuariosService } from './idiomas_usuarios.service';

describe('IdiomasUsuariosController', () => {
  let controller: IdiomasUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdiomasUsuariosController],
      providers: [IdiomasUsuariosService],
    }).compile();

    controller = module.get<IdiomasUsuariosController>(IdiomasUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
