import { Test, TestingModule } from '@nestjs/testing';
import { FasesPostulacionesController } from './fases_postulaciones.controller';
import { FasesPostulacionesService } from './fases_postulaciones.service';

describe('FasesPostulacionesController', () => {
  let controller: FasesPostulacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FasesPostulacionesController],
      providers: [FasesPostulacionesService],
    }).compile();

    controller = module.get<FasesPostulacionesController>(FasesPostulacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
