import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasSeguidasService } from './empresas_seguidas.service';

describe('EmpresasSeguidasService', () => {
  let service: EmpresasSeguidasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmpresasSeguidasService],
    }).compile();

    service = module.get<EmpresasSeguidasService>(EmpresasSeguidasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
