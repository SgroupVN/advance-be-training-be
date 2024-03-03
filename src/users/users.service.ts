import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DigestService } from '../system/services';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly digestService: DigestService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository
      .createQueryBuilder('user')
      .insert()
      .values({
        username: createUserDto.username,
        password: await this.digestService.hash(createUserDto.password),
        fullName: 'Phu',
        email: 'phu@gmail.com',
      })
      .orIgnore('username')
      .execute();
  }

  findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  findAll() {
    return this.userRepository.find({
      relations: ['roles'],
      skip: 0,
      take: 20,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getRightsByUserId(userId: string) {
    const user = await this.userRepository.findOne({
      relations: ['roles', 'roles.permissions'],
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('Missing user');
    }

    return user.roles
      .map((role) => role.permissions.map((per) => per.name))
      .flat();
  }
}
