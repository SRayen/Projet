import { Profil } from '@prisma/client';
import { IsString, IsNotEmpty, MinLength, IsEnum } from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
  })
  user_name: string;

  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  mot_de_passe: string;

  @IsEnum(Profil)
  profil: Profil;
}

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3, {
    message: "Le nom d'utilisateur doit contenir au moins 3 caractères",
  })
  user_name: string;

  @IsString()
  @MinLength(6, {
    message: 'Le mot de passe doit contenir au moins 6 caractères',
  })
  mot_de_passe: string;
}
