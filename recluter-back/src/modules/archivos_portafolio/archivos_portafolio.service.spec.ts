import { Test, TestingModule } from '@nestjs/testing';
import { ArchivosPortafolioService } from './archivos_portafolio.service';

describe('ArchivosPortafolioService', () => {
  let service: ArchivosPortafolioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchivosPortafolioService],
    }).compile();

    service = module.get<ArchivosPortafolioService>(ArchivosPortafolioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
