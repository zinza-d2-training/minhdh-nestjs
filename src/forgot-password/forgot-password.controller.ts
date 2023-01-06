import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { UserEmailDto } from './dto/user-email.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('/forgot-password')
export class ForgotPasswordController {
  constructor(private forgotPasswordService: ForgotPasswordService) {}

  @Post()
  async forgotPassword(@Body() userEmailDto: UserEmailDto) {
    return await this.forgotPasswordService.forgotPassword(userEmailDto);
  }

  @Get('reset/:token')
  async resetPassword(@Param('token') token: string) {
    return this.forgotPasswordService.resetPassword(token);
  }
}
