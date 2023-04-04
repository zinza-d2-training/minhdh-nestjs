import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { loginDtoReq } from './dto/loginDtoReq';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() req: loginDtoReq) {
    return await this.authService.login(req);
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
  async getUserInfo(@Query() { token }: { token: string }) {
    return await this.authService.getUserInfo(token);
  }
}
