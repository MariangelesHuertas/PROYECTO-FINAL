import { Test, TestingModule } from '@nestjs/testing';
import { IdiomasUsuariosService } from './idiomas_usuarios.service';

describe('IdiomasUsuariosService', () => {
  let service: IdiomasUsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdiomasUsuariosService],
    }).compile();

    service = module.get<IdiomasUsuariosService>(IdiomasUsuariosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
