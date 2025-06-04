import { Body, Controller, Param, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login/:userType')
  async login(
    @Param('userType') userType: 'conductor' | 'company',
    @Body() body: { email: string; password: string },
  ) {
    const { email, password } = body;

    if (userType === 'conductor') {
      return this.authService.loginUser(email, password);
    }

    if (userType === 'company') {
      return this.authService.login(email, password);
    }

    throw new UnauthorizedException('Invalid login type');
  }

}
