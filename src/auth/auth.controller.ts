import { Body, Controller, Get, Post, Query, Request } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { UserType } from './type/loginType';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Request() data: UserType) {
    return await this.authService.login(data);
  }

  @Get('logout')
  async logout() {
    return await this.authService.logout();
  }

  @Post('signup')
  async signup(@Body() newUser: CreateUserDto) {
    return await this.authService.register(newUser);
  }

  @Get('/token')
  async checkToken(@Query() { token }: { token: string }) {
    return await this.authService.checkToken(token);
  }
}
