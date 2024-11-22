import { Test, TestingModule } from '@nestjs/testing';
import { CvGeneralController } from './cv_general.controller';
import { CvGeneralService } from './cv_general.service';

describe('CvGeneralController', () => {
  let controller: CvGeneralController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvGeneralController],
      providers: [CvGeneralService],
    }).compile();

    controller = module.get<CvGeneralController>(CvGeneralController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
