import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

export class UserNotFound extends Error {
  constructor() {
    super('User not found');
  }
}

export class InvalidCredentials extends Error {
  constructor() {
    super('invalid credentials');
  }
}

@Injectable()
export class AuthService {
  constructor(private readonly users: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, password: string): Promise<{access_token?: string}> {
    const user = await this.users.findOne(email);
    if (!user) {
      throw new InvalidCredentials();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (user && isMatch) {
      const payload = { sub: user.email, name: user.name };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }

    throw new InvalidCredentials();
  }
  

  async signUp(user: User): Promise<User> {
    const userExists = await this.users.findOne(user.email);
    if (userExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    return await this.users.createUser(user);
  }
}
