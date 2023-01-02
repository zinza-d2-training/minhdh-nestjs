import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User } from './auth/type/loginType';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async login(@Request() req: User) {
    return this.authService.login(req);
  }

  @Get('auth/logout')
  async logout() {
    return await this.authService.logout();
  }
}
