import { GroupDto } from './dto/group-dto';
import { Group } from './../typeorm/entities/Group';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private repoGroup: Repository<Group>
  ) {}

  async findAll() {
    return await this.repoGroup.find();
  }

  async findOneById(id: number) {
    try {
      return await this.repoGroup.findOne({ where: { id: id } });
    } catch (error) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async create(newData: GroupDto) {
    try {
      const newGroup = this.repoGroup.create(newData);
      return await this.repoGroup.save(newGroup);
    } catch (error) {
      throw new HttpException('Cannot create', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async delete(id: number) {
    try {
      return await this.repoGroup.delete({ id });
    } catch (error) {
      throw new HttpException('Cannot delete', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
