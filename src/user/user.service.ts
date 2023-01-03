import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findAll() {
    try {
      const allUsers = await this.repo.find();
      return allUsers;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.repo.findOne({
        where: { id }
      });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findUserByEmail(email: string) {
    return await this.repo.findOneOrFail({
      where: { email }
    });
  }

  async findUserByIdentityCard(identityCardNumber: string) {
    return await this.repo.findOneOrFail({
      where: {
        identity_card_number: identityCardNumber
      }
    });
  }

  async findUserByResetToken(token: string) {
    return await this.repo.findOneOrFail({
      where: {
        reset_token: token
      }
    });
  }

  async createUser(newUser: CreateUserDto) {
    try {
      const user = this.repo.create(newUser);
      return await this.repo.save(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUserById(id: number, userUpdate: CreateUserDto) {
    try {
      return await this.repo.update({ id }, userUpdate);
    } catch (err) {
      throw new Error(err);
    }
  }

  async deleteUser(id: number) {
    try {
      return await this.repo.delete({ id });
    } catch (err) {
      throw new Error(err);
    }
  }
}
