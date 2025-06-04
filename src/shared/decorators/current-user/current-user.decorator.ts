import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
      userId: req.user?.userId,
      companyId: req.user?.companyId,
      role: req.user?.role,
    };
  },
);
