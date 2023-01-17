import { isEmpty } from './../utils/validate';
import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/typeorm/entities/User';
import { UpdateUser } from './dtos/update-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll() {
    try {
      const allUsers = await this.repo.find();
      return allUsers;
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

  async updateUserById(id: number, userUpdate: UpdateUser) {
    try {
      if (!isEmpty(userUpdate.password)) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(userUpdate.password, salt);
        return await this.repo.update(
          { id },
          {
            ...userUpdate,
            password: hashPassword
          }
        );
      } else {
        return await this.repo.update({ id }, userUpdate);
      }
    } catch (err) {
      throw new HttpException('Cannot update', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
