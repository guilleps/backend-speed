import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';

@Injectable()
export class JwtDriverGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ user: AuthenticatedUser }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Usuario no autenticado.');
    }

    if (user.role !== 'conductor') {
      throw new UnauthorizedException(
        'Solo los conductores pueden realizar esta acción.',
      );
    }

    if (!user.companyId) {
      throw new UnauthorizedException('Conductor sin empresa asignada.');
    }

    return true;
  }
}
