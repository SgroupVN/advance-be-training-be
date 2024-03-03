import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCESS_RIGHT_META_DATA_KEY } from './can-access-by.decorator';
import { authRegistry } from './auth.registry';
import { AuthorService } from './author.service';

@Injectable()
export class AccessRightGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userID = context.switchToHttp().getRequest().user.userId;
    const requiredRights = this.reflector.get<string[]>(
      ACCESS_RIGHT_META_DATA_KEY,
      context.getHandler(),
    );

    const rights: string[] = await authRegistry
      .get(AuthorService.name)
      .getUserRights(userID);

    return requiredRights.some((right) => rights.includes(right));
  }
}
