import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token?: string }> {
    return await this.auth.signIn(email, password);
  }

  @Post('register')
  async register(@Body('user') user: User): Promise<User> {
    return await this.auth.signUp(user);
  }
}
