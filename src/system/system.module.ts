import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { DigestService, EnvironmentKeyFactory } from './services';
import { DatabaseModule } from './database/database.module';

@Global()
@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  providers: [DigestService, EnvironmentKeyFactory],
  exports: [DigestService, EnvironmentKeyFactory],
})
export class SystemModule {}
