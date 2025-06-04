import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtDriverGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || user.role !== 'CONDUCTOR') {
      throw new ForbiddenException('Solo los conductores pueden realizar esta acción.');
    }

    if (!user.companyId) {
      throw new ForbiddenException('Conductor sin empresa asignada.');
    }

    return true;
  }
}
