import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SigninDto, SignupDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

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

  async singIn(dto: SigninDto, res: Response) {
    const { user_name, mot_de_passe } = dto;

    const foundUser = await this.prisma.user.findUnique({
      where: { user_name },
    });
    if (!foundUser) {
      throw new BadRequestException(
        "nom d'utilisateur ou mot de passe invalide !",
      );
    }

    const isValidPassword = await bcrypt.compare(
      mot_de_passe,
      foundUser.mot_de_passe,
    );

    if (!isValidPassword) {
      throw new BadRequestException(
        "nom d'utilisateur ou mot de passe invalide !",
      );
    }

    //Sign jwt and return to the user
    const token = await this.generateJWT({
      id: foundUser.id,
    });

    if (!token) {
      throw new ForbiddenException();
    }

    res.cookie('token', token, { httpOnly: true });
    return res.send({ message: 'Connecté avec succès', id: foundUser.id });
  }

  private generateJWT(args: { id: string }) {
    const payload = args;
    return this.jwt.signAsync(payload, { secret: process.env.JWT_SECRET });
  }

  async getUser(req: Request) {
    try {
      const cookie = req.cookies['token'];
      const data = await this.jwt.verifyAsync(cookie, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: data.id },
        select: { user_name: true, profil: true }, //return only email, password
      });

      return user;
    } catch (error) {
      throw new BadRequestException('An unexpected error occurred !');
    }
  }

  async singOut(res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Déconnecté avec succès' });
  }
}
