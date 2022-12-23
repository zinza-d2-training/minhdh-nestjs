import { LocalAuthGuard } from './auth/local-auth.guard';
import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/dtos/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: LoginDto) {
    return this.authService.login(req);
  }

  @Get('auth/logout')
  async logout() {
    return await this.authService.logout();
  }
}
