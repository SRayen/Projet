import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singUp(@Body() dto: SignupDto) {
    return this.authService.singUp(dto);
  }

  @Post('signin')
  singIn(@Body() dto: SigninDto, @Res() res: Response) {
    return this.authService.singIn(dto, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  getUser(@Req() req: Request) {
    return this.authService.getUser(req);
  }
  @Post('signout')
  singOut(@Res() res: Response) {
    return this.authService.singOut(res);
  }
}
