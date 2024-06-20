import { Controller, Post, Body, Get, Query, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      return { token: null };
    }
    return this.authService.login(user);
  }

  @Get('verify')
  async verify(@Headers('Authorization') token: string, @Query('user') userId: string) {
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.usersService.findOneById(parseInt(userId));
      if (user && decoded.sub === user.user_id) {
        return { auth: true };
      }
      return { auth: false };
    } catch (e) {
        console.log(e);
      return { auth: false }
    }
  }
}
