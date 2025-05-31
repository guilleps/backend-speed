import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';

export const CurrentCompany = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)
