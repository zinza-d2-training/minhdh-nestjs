import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { UserModule } from 'src/user/user.module';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

dotenv.config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAIL,
        secure: false,
        auth: {
          user: process.env.USER_MAIL,
          pass: process.env.PASS_MAIL
        }
      },
      defaults: {
        from: "'No Reply' <noreply@gmail.com>"
      }
    }),
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5m' },
      verifyOptions: { ignoreExpiration: false }
    })
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
  exports: [ForgotPasswordService]
})
export class ForgotPasswordModule {}
