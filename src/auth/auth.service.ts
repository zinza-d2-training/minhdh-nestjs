import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from './type/loginType';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      const is_equal = bcrypt.compareSync(password, user.password);
      if (is_equal) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: UserType) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  async register(user: CreateUserDto) {
    try {
      const userExist = await this.userService.findUserByIdentityCard(
        user.identity_card_number
      );
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
      throw new InternalServerErrorException(error);
    }
  }

  async logout() {
    return { message: 'Logout success' };
  }
}
