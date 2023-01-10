import { Test, TestingModule } from '@nestjs/testing';
import { VaccinationSitesService } from './vaccination_sites.service';

describe('VaccinationSitesService', () => {
  let service: VaccinationSitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccinationSitesService]
    }).compile();

    service = module.get<VaccinationSitesService>(VaccinationSitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
