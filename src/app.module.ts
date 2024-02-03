import { Module } from '@nestjs/common';
import { DatabaseModule } from './system/database/database.module';
import { SystemModule } from './system/system.module';
import { MenuModule } from './system/menu/internal/menu.module';

@Module({
  imports: [DatabaseModule, SystemModule, MenuModule],
})
export class AppModule {}
