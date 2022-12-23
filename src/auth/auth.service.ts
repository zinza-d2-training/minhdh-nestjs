import { Dependencies, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
@Dependencies(UserService)
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findEmailLogin(email);
    if (user) {
      const is_equal = bcrypt.compare(password, user.password);
      if (is_equal) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id };
    return {
      token: this.jwtService.sign(payload)
    };
  }

  async logout() {
    return { message: 'Logout success' };
  }
}
