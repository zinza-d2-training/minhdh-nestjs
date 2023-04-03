import { loginDtoReq } from './dto/loginDtoReq';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
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

  async login(data: loginDtoReq) {
    const user = await this.userService.findUserByEmail(data.email);
    if (user) {
      const is_equal = bcrypt.compareSync(data.password, user.password);
      if (is_equal) {
        const token = this.jwtService.sign(
          { id: user.id, email: user.email },
          {
            secret: process.env.JWT_SECRET_KEY
          }
        );
        return { token };
      } else {
        return null;
      }
    }
    return null;
  }

  async register(user: CreateUserDto) {
    try {
      const userExist = await this.userService.findUserByIdentityCard(
        user.identity_card_number
      );
      if (!userExist) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(user.password, salt);
        await this.userRepository.save({
          ...user,
          password: hashPassword
        });
        return { msgSuccess: 'Đăng ký thành công!' };
      } else {
        return { msgError: 'Tài khoản đã tồn tại!' };
      }
    } catch (error) {
      throw new HttpException(error, 400, { cause: new Error('Some Error') });
    }
  }

  async logout() {
    return { message: 'Logout success' };
  }

  async getUserInfo(token: string) {
    try {
      if (token) {
        const payload = await this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET_KEY
        });
        if (payload) {
          const user = await this.userService.findUserById(payload.id);
          if (user) {
            return { user: user };
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
