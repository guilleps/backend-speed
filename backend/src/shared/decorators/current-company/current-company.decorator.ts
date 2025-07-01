import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from 'src/shared/interfaces/authenticated-user.interface';

export const CurrentCompany = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('[JwtGuard] Headers:', request.headers);
    return request.user;
  },
);
