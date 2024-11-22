import { Test, TestingModule } from '@nestjs/testing';
import { FasesPostulacionesService } from './fases_postulaciones.service';

describe('FasesPostulacionesService', () => {
  let service: FasesPostulacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FasesPostulacionesService],
    }).compile();

    service = module.get<FasesPostulacionesService>(FasesPostulacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
