import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationSitesController } from './vaccination_sites.controller';

describe('VaccinationSitesController', () => {
  let controller: VaccinationSitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccinationSitesController],
    }).compile();

    controller = module.get<VaccinationSitesController>(VaccinationSitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
