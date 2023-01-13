import { UpdateVaccineRegistrationDto } from './dto/update-vaccine-registration-dto';
import { VaccineRegistration } from './../typeorm/entities/VaccineRegistration';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVaccineRegistrationDto } from './dto/create-vaccine-registration-dto';

@Injectable()
export class VaccineRegistrationService {
  constructor(
    @InjectRepository(VaccineRegistration)
    private repoVaccineRegistration: Repository<VaccineRegistration>
  ) {}

  async findAll() {
    return await this.repoVaccineRegistration.find();
  }

  async findById(id: number) {
    try {
      return await this.repoVaccineRegistration.findOne({ where: { id } });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(newData: CreateVaccineRegistrationDto) {
    try {
      return await this.repoVaccineRegistration.save(newData);
    } catch (err) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async update(id: number, newData: UpdateVaccineRegistrationDto) {
    try {
      return await this.repoVaccineRegistration.update({ id }, newData);
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
