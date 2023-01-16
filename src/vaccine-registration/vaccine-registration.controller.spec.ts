import { Test, TestingModule } from '@nestjs/testing';
import { VaccineRegistrationController } from './vaccine-registration.controller';

describe('VaccineRegistrationController', () => {
  let controller: VaccineRegistrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VaccineRegistrationController]
    }).compile();

    controller = module.get<VaccineRegistrationController>(
      VaccineRegistrationController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
