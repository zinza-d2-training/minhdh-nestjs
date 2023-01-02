import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Controller, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { UserType } from './auth/type/loginType';
import { User } from './auth/decorators/user.decorator';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auth/login')
  async login(@User() req: UserType) {
    return this.authService.login(req);
  }

  @Get('auth/logout')
  async logout() {
    return await this.authService.logout();
  }
}
