import { VaccineDto } from './dto/vaccine-dto';
import { Vaccine } from './../typeorm/entities/Vaccine';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class VaccineService {
  constructor(
    @InjectRepository(Vaccine)
    private repoVaccine: Repository<Vaccine>
  ) {}

  async findAll() {
    return await this.repoVaccine.find();
  }

  async findOneById(id: number) {
    try {
      return await this.repoVaccine.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(newData: VaccineDto) {
    try {
      return await this.repoVaccine.save(newData);
    } catch (error) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: number) {
    try {
      return await this.repoVaccine.delete({ id });
    } catch (error) {
      throw new HttpException('Cannot delete', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
