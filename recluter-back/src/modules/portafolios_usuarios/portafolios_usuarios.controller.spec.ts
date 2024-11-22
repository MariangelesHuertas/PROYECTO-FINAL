import { Test, TestingModule } from '@nestjs/testing';
import { PortafoliosUsuariosController } from './portafolios_usuarios.controller';
import { PortafoliosUsuariosService } from './portafolios_usuarios.service';

describe('PortafoliosUsuariosController', () => {
  let controller: PortafoliosUsuariosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortafoliosUsuariosController],
      providers: [PortafoliosUsuariosService],
    }).compile();

    controller = module.get<PortafoliosUsuariosController>(PortafoliosUsuariosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
