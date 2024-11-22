import { Test, TestingModule } from '@nestjs/testing';
import { PortafoliosUsuariosService } from './portafolios_usuarios.service';

describe('PortafoliosUsuariosService', () => {
  let service: PortafoliosUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortafoliosUsuariosService],
    }).compile();

    service = module.get<PortafoliosUsuariosService>(PortafoliosUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
