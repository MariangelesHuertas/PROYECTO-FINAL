import { Test, TestingModule } from '@nestjs/testing';
import { CvsUsuariosService } from './cvs_usuarios.service';

describe('CvsUsuariosService', () => {
  let service: CvsUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvsUsuariosService],
    }).compile();

    service = module.get<CvsUsuariosService>(CvsUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
