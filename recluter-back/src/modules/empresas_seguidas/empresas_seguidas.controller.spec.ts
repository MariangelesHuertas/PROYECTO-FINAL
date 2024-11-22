import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasSeguidasController } from './empresas_seguidas.controller';
import { EmpresasSeguidasService } from './empresas_seguidas.service';

describe('EmpresasSeguidasController', () => {
  let controller: EmpresasSeguidasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresasSeguidasController],
      providers: [EmpresasSeguidasService],
    }).compile();

    controller = module.get<EmpresasSeguidasController>(EmpresasSeguidasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
