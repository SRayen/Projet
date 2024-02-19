import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SigninDto, SignupDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async singUp(dto: SignupDto) {
    const { user_name, mot_de_passe, profil } = dto;
    const foundUser = await this.prisma.user.findUnique({
      where: { user_name },
    });

    if (foundUser) {
      throw new BadRequestException(
        "Un compte existe déjà avec cette nom d'utilisateur",
      );
    }

    const mdp_crypte = await bcrypt.hash(mot_de_passe, 10);

    await this.prisma.user.create({
      data: {
        user_name,
        mot_de_passe: mdp_crypte,
        profil,
      },
    });
    return { message: 'Utilisateur créé avec succès' };
  }

  async singIn(dto: SigninDto) {
    const { user_name, mot_de_passe } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { user_name },
    });
    if (!foundUser) {
      throw new BadRequestException('user_name ou mot de passe invalide !');
    }

    const isValidPassword = await bcrypt.compare(
      mot_de_passe,
      foundUser.mot_de_passe,
    );

    if (!isValidPassword) {
      throw new BadRequestException('user_name ou mot de passe invalide !');
    }
  }
}
