import { Module } from '@nestjs/common';
import { DatabaseModule } from './system/database/database.module';
import { UserModule } from './account-service/user/internal/user.module';
import { AuthModule } from './account-service/authentication/internal/auth.module';
import { AuthorizationModule } from './account-service/authorization/internal/authorization.module';
import { SystemModule } from './system/system.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    AuthorizationModule,
    SystemModule,
    UsersModule,
  ],
})
export class AppModule {}
