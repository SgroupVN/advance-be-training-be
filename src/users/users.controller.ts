import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from '../auth/user.decorator';
import { CurrentUserVO } from '../auth/valueObject/currentUser.vo';
import { Identified } from '../auth/identified.decorator';
import { CanAccessBy } from '../auth/can-access-by.decorator';
import { AccessRights } from '../system/database/seeders/1657339599214-seed-roles';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Identified
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @CanAccessBy(AccessRights.VIEW_USERS)
  findAll(@CurrentUser() user: CurrentUserVO) {
    console.log(user);
    return this.usersService.findAll();
  }

  @Identified
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Identified
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
