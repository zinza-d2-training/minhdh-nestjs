import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUser } from './dtos/update-user.dto';
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
      return await this.repo.findOne({
        where: { id }
      });
    } catch (err) {
      throw new Error(err);
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
      throw new Error(err);
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
      throw new Error(err);
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
      throw new Error(err);
    }
  }

  async createUser(newUser: CreateUserDto) {
    try {
      const user = this.repo.create(newUser);
      return await this.repo.save(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUserById(id: number, userUpdate: UpdateUser) {
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
