import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'jwt_secret_key'),
    });
  }

  async validate(payload: JwtPayload) {
    // console.log('[JwtStrategy] payload:', payload);
    return {
      userId: payload.sub,
      email: payload.email,
      companyId: payload.companyId,
      role: payload.role,
    };
  }
}
