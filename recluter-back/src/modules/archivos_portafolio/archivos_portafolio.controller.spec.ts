import { Test, TestingModule } from '@nestjs/testing';
import { ArchivosPortafolioController } from './archivos_portafolio.controller';
import { ArchivosPortafolioService } from './archivos_portafolio.service';

describe('ArchivosPortafolioController', () => {
  let controller: ArchivosPortafolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchivosPortafolioController],
      providers: [ArchivosPortafolioService],
    }).compile();

    controller = module.get<ArchivosPortafolioController>(ArchivosPortafolioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
