import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUserVO } from './valueObject/currentUser.vo';

// Factory pattern
export const CurrentUser = createParamDecorator<
  string,
  ExecutionContext,
  CurrentUserVO
>((propKey: string, ctx: ExecutionContext): CurrentUserVO => {
  const req = ctx.switchToHttp().getRequest();

  return propKey ? req.user[propKey] : req.user;
});
