import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEmailDto } from './dto/user-email.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

dotenv.config();
@Injectable()
export class ForgotPasswordService {
  constructor(
    private jwtService: JwtService,
    private mailerService: MailerService,
    private userService: UserService
  ) {}

  async forgotPassword(userMail: UserEmailDto) {
    const user = await this.userService.findUserByEmail(userMail.email);
    if (user) {
      const token = this.jwtService.sign(
        { id: user.id },
        { secret: process.env.JWT_SECRET_KEY }
      );
      await this.userService.updateUserById(user.id, {
        ...user,
        reset_token: token
      });
      const url = `${process.env.URL_RESET_TOKEN}${token}`;
      await this.mailerService.sendMail({
        to: user.email,
        from: process.env.SENDER,
        subject: 'Password Reset',
        html: `Follow <a href=${url}>here</a> to reset your password`
      });
      return {
        message: 'Check your mail'
      };
    } else {
      throw new HttpException('Not exits email', HttpStatus.NOT_FOUND);
    }
  }

  async resetPassword(token: string) {
    const newPassword = Math.random().toString(36).slice(-8);
    const tokenVerified = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY
    });
    if (tokenVerified) {
      const user = await this.userService.findUserByResetToken(token);
      if (user) {
        const hashPassword = bcrypt.hashSync(newPassword);
        await this.userService.updateUserById(user.id, {
          ...user,
          password: hashPassword,
          reset_token: null
        });
        return {
          message: `New password is : ${newPassword}`
        };
      }
    } else {
      throw new HttpException('Token not valid', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
