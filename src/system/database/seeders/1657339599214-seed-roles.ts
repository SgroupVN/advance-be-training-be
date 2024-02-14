import { In, MigrationInterface, QueryRunner } from 'typeorm';
import keyBy from 'lodash/keyBy';
import { Role } from 'src/auth/entities/role.entity';
import { Permission } from 'src/auth/entities/permission.entity';

export enum SystemRoles {
  CHAIRMAN = 'Chairman',
  DOMAIN_CHIEF = 'Domain Chief',
  DOMAIN_LEADER = 'Domain Leader',
  MEMBER = 'Member',
}

export enum AccessRights {
  VIEW_USERS = 'View users',
  EDIT_MEMBER_USER = 'Edit member user',
  VIEW_ACCESS_RIGHTS = 'View access rights',
  EDIT_ACCESS_RIGHTS = 'Edit access rights',
  MANAGE_RECRUITMENT = 'Manage recruitments',
}


export class SeedRoles1657339599214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    const permissionRepository = queryRunner.manager.getRepository(Permission);

    const savedRoles = await roleRepository.save([
      {
        name: SystemRoles.CHAIRMAN,
        description: 'Chairman of group',
        isEditable: false,
      },
      {
        name: SystemRoles.DOMAIN_CHIEF,
        description: 'User who is the chief of a domain knowledge in group',
      },
      {
        name: SystemRoles.DOMAIN_LEADER,
        description:
          'User who is the leader of a domain knowledge in group, support chief',
      },
      {
        name: SystemRoles.MEMBER,
        description: 'Member in the system',
      },
    ]);
    const savedPermissions = await permissionRepository.save([
      {
        name: AccessRights.VIEW_ACCESS_RIGHTS,
        description: 'View access rights of system',
      },
      {
        name: AccessRights.EDIT_MEMBER_USER,
        description: 'Modify member user',
      },
      {
        name: AccessRights.VIEW_USERS,
        description: 'View users of system',
      },
      {
        name: AccessRights.EDIT_ACCESS_RIGHTS,
        description: 'Edit roles of system',
      },
      {
        name: AccessRights.MANAGE_RECRUITMENT,
        description: 'Manage recruitment',
      },
    ]);
    const nameMapToRoles = keyBy(savedRoles, 'name');
    const nameMapToPermissions = keyBy(savedPermissions, 'name');

    const roleNameMapToPermissionNames = {
      [SystemRoles.CHAIRMAN]: Object.values(AccessRights),
      [SystemRoles.DOMAIN_CHIEF]: [
        AccessRights.VIEW_USERS,
        AccessRights.EDIT_MEMBER_USER,
      ],
      [SystemRoles.DOMAIN_LEADER]: [
        AccessRights.VIEW_USERS,
        AccessRights.EDIT_MEMBER_USER,
      ],
      [SystemRoles.MEMBER]: [],
    };

    await roleRepository.save(
      Object.keys(roleNameMapToPermissionNames).map((roleName) => {
        const role = nameMapToRoles[roleName];

        role.permissions = roleNameMapToPermissionNames[roleName].map(
          (permissionName) => nameMapToPermissions[permissionName],
        );

        return role;
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const roleRepository = queryRunner.manager.getRepository(Role);
    await roleRepository.delete({
      name: In(Object.values(SystemRoles)),
    });
  }
}
