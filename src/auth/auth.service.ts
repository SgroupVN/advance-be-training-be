import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/request/login.dto';
import { UserCredentialsDto } from './dto/response/user-credentials.dto';
import { DigestService } from '../system/services';
import { UsersService } from '../users/users.service';
import { InvalidLoginException } from './exceptions/invalid-login.exception';
import { JwtService } from '@nestjs/jwt';
import { CurrentUserVO } from './valueObject/currentUser.vo';

@Injectable()
export class AuthService {
  constructor(
    private readonly digestService: DigestService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(authDto: LoginDto): Promise<UserCredentialsDto> {
    const user = await this.userService.findByUsername(authDto.username);

    // Guard clause
    if (!user) {
      throw new InvalidLoginException();
    }

    if (!(await this.digestService.compare(user.password, authDto.password))) {
      throw new InvalidLoginException();
    }

    return {
      accessToken: await this.jwtService.signAsync({
        userId: user.id,
      } as CurrentUserVO),
    };
  }
}
