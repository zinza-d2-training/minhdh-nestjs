import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from './type/loginType';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.userService.findUserByEmail(email);
      if (user) {
        const is_equal = await bcrypt.compare(password, user.password);
        if (is_equal) {
          return user;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async login(user: UserType) {
    const token = this.jwtService.sign(
      { id: user.id, email: user.email },
      {
        secret: process.env.JWT_SECRET_KEY
      }
    );
    return { token };
  }

  async register(user: CreateUserDto) {
    try {
      const userExist = await this.userService.findUserByIdentityCard(
        user.identity_card_number
      );
      console.log(userExist);

      if (!userExist) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(user.password, salt);
        return await this.userRepository.save({
          ...user,
          password: hashPassword
        });
      } else {
        throw new HttpException(
          'Tài khoản đã tồn tại',
          HttpStatus.NOT_ACCEPTABLE
        );
      }
    } catch (error) {
      throw new HttpException(error, 400, { cause: new Error('Some Error') });
    }
  }

  async logout() {
    return { message: 'Logout success' };
  }

  async checkToken(token: string) {
    try {
      if (token) {
        const payload = await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_KEY
        });
        if (payload) {
          const user = await this.userService.findOne(payload.id);
          if (user) {
            return { user: user, isAdmin: payload.isAdmin !== 0 };
          }
        }
      } else {
        throw new HttpException('Token in valid', HttpStatus.NOT_ACCEPTABLE);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
