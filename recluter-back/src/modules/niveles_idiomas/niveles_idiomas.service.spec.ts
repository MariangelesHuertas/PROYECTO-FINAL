import { Test, TestingModule } from '@nestjs/testing';
import { NivelesIdiomasService } from './niveles_idiomas.service';

describe('NivelesIdiomasService', () => {
  let service: NivelesIdiomasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NivelesIdiomasService],
    }).compile();

    service = module.get<NivelesIdiomasService>(NivelesIdiomasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
