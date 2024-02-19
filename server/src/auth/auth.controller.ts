import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { SigninDto, SignupDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  singUp(@Body() dto: SignupDto) {
    return this.authService.singUp(dto);
  }

  @Post('signin')
  singIn(@Body() dto: SigninDto) {
    return this.authService.singIn(dto);
  }
}
