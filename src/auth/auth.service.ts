import {
  Dependencies,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { UserType } from './type/loginType';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findEmailLogin(email);
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
      const userExist = await this.userService.findUserExist(
        user.identity_card_number
      );
      if (!userExist) {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashPassword = bcrypt.hashSync(user.password, salt);
        const saveUser = {
          ...user,
          password: hashPassword
        };
        const newUser = await this.userRepository.save(saveUser);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = newUser;
        return result;
      } else {
        throw new HttpException(
          'Tài khoản đã tồn tại',
          HttpStatus.NOT_ACCEPTABLE
        );
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async logout() {
    return { message: 'Logout success' };
  }
}
