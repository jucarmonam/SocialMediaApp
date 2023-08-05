import { Body, Controller, NotFoundException, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService, InvalidCredentials, UserNotFound } from './auth.service';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ access_token?: string }> {
    try {
      return await this.auth.signIn(email, password);
    } catch (e) {
      if (e instanceof InvalidCredentials) {
        throw new UnauthorizedException('invalid credentials');
      }

      throw e;
    }
  }

  @Post('register')
  async register(@Body() user: User): Promise<User> {
    return await this.auth.signUp(user);
  }
}
