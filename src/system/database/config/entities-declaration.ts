import { join } from 'path';
import { Permission } from 'src/auth/entities/permission.entity';
import { Role } from 'src/auth/entities/role.entity';
import { User } from 'src/users/entities/user.entity';

export const APP_ENTITIES = [User, Role, Permission];

export const MIGRATION_CONFIGS = {
  migrations: [join(__dirname, '../../database/migrations/*{.ts,.js}')],
  migrationsTableName: 'migrations',
};
