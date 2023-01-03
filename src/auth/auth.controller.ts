import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { User } from './decorators/user.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserType } from './type/loginType';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('login')
  async login(@User() req: UserType) {
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
}
