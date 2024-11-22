import { Test, TestingModule } from '@nestjs/testing';
import { NivelesIdiomasController } from './niveles_idiomas.controller';
import { NivelesIdiomasService } from './niveles_idiomas.service';

describe('NivelesIdiomasController', () => {
  let controller: NivelesIdiomasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NivelesIdiomasController],
      providers: [NivelesIdiomasService],
    }).compile();

    controller = module.get<NivelesIdiomasController>(NivelesIdiomasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
