import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { jwtConstants } from 'src/auth/constants';
import { UserModule } from 'src/user/user.module';
import { ForgotPasswordController } from './forgot-password.controller';
import { ForgotPasswordService } from './forgot-password.service';

dotenv.config();
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.HOST_MAIL,
        port: process.env.PORT_MAIL,
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
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
      verifyOptions: { ignoreExpiration: false }
    })
  ],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
  exports: [ForgotPasswordService]
})
export class ForgotPasswordModule {}
