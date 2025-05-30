import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CompaniesModule } from 'src/companies/companies.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt-strategy/jwt-strategy.service';
import { JwtGuard } from './jwt/jwt.guard';

@Module({
  imports: [
    CompaniesModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'jwt_secret_key',
      signOptions: { expiresIn: '1h' }
    }),
  ],
  providers: [AuthService, JwtStrategy, JwtGuard],
  controllers: [AuthController],
  exports: [JwtGuard]
})
export class AuthModule {}
