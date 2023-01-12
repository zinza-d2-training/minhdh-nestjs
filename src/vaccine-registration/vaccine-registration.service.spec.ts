import { Test, TestingModule } from '@nestjs/testing';
import { VaccineRegistrationService } from './vaccine-registration.service';

describe('VaccineRegistrationService', () => {
  let service: VaccineRegistrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VaccineRegistrationService]
    }).compile();

    service = module.get<VaccineRegistrationService>(
      VaccineRegistrationService
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
