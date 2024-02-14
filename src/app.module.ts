import { Module } from '@nestjs/common';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    SystemModule,
    UsersModule,
  ],
})
export class AppModule {}
