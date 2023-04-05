import { UpdateUser } from './dtos/update-user.dto';
import { UpdateInfoUser } from './dtos/update-info-user-dto';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/typeorm/entities/User';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll() {
    try {
      return await this.repo.find({ where: { id: Not(1) } });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findUserById(id: number) {
    try {
      return await this.repo.findOne({
        where: { id }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findUserByEmail(email: string) {
    try {
      return await this.repo.findOne({
        where: {
          email
        }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findUserByIdentityCard(identityCardNumber: string) {
    try {
      return await this.repo.findOne({
        where: {
          identity_card_number: identityCardNumber
        }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async findUserByResetToken(token: string) {
    try {
      return await this.repo.findOne({
        where: {
          reset_token: token
        }
      });
    } catch (err) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateUser(id: number, userUpdate: UpdateUser) {
    try {
      return this.repo.update({ id }, userUpdate);
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updateUserById(id: number, userUpdate: UpdateInfoUser) {
    try {
      await this.repo.update({ id }, userUpdate);
      return { msg: 'Updated successfully!!' };
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }

  async updatePasswordUser(id: number, password: string) {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      await this.repo.update(
        { id },
        {
          password: hashPassword
        }
      );
      return { msg: 'Updated successfully!!' };
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
