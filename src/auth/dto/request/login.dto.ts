import { IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  password: string;
}
