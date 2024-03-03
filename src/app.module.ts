import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    SystemModule,
    UsersModule,
    CacheModule.register({ isGlobal: true }),
  ],
})
export class AppModule {}
