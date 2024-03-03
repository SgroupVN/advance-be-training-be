import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Identified } from './identified.decorator';
import { AccessRightGuard } from './access-right.guard';

export const ACCESS_RIGHT_META_DATA_KEY = 'rights';

export function CanAccessBy(...rights: string[]) {
  return applyDecorators(
    SetMetadata(ACCESS_RIGHT_META_DATA_KEY, rights),
    Identified,
    UseGuards(AccessRightGuard),
  );
}
