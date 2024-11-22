import { Test, TestingModule } from '@nestjs/testing';
import { CvGeneralService } from './cv_general.service';

describe('CvGeneralService', () => {
  let service: CvGeneralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvGeneralService],
    }).compile();

    service = module.get<CvGeneralService>(CvGeneralService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
