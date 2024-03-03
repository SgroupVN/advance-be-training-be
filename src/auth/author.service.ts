import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { authRegistry } from './auth.registry';

@Injectable()
export class AuthorService {
  constructor(
    private readonly userService: UsersService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    authRegistry.set(AuthorService.name, this);
  }

  private getRightKey(userId: string): string {
    return `userRights${userId}`;
  }

  async saveUserRights(userId: string) {
    const userRights = await this.userService.getRightsByUserId(userId);

    await this.cacheManager
      .set(this.getRightKey(userId), userRights, {
        ttl: 60 * 60,
      })
      .catch(() => {
        console.log('Redis down idk');
      });

    return userRights;
  }

  async getUserRights(userId: string): Promise<string[]> {
    const cachedRights = await this.cacheManager.get<string[]>(
      this.getRightKey(userId),
    );

    return cachedRights ?? (await this.saveUserRights(userId));
  }
}
