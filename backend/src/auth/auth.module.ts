import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from 'src/companies/companies.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt-strategy/jwt-strategy.service';
import { JwtGuard } from './jwt/jwt.guard';
import { UsersModule } from 'src/users/users.module';
import { JwtUserStrategy } from './jwt/jwt-strategy/jwt-user-strategy.service';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CompaniesModule,
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'jwt_secret_key'),
        signOptions: { expiresIn: '1h' },
      })
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtGuard, JwtUserStrategy],
  controllers: [AuthController],
  exports: [JwtGuard],
})
export class AuthModule { }
