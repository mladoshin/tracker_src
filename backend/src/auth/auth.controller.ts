import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginuserDto } from 'src/user/dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() { email, pass }: LoginuserDto,
    @Response({ passthrough: true }) res,
  ) {
    try {
      const data = await this.authService.signIn(email, pass);
      //res.cookie('refresh_token', data.refreshToken);
      res.setHeader('set-cookie', [
        `refresh_token=${data.refreshToken}; Domain=silvershipping.co; Path=/`,
      ]);
      return { access_token: data.accessToken, user: data.user };
    } catch {
      res.clearCookie('refresh_token');
      throw new UnauthorizedException();
    }
  }

  @Post('register')
  async create(
    @Body() data: CreateUserDto,
    @Response({ passthrough: true }) res,
  ) {
    try {
      const resp = await this.authService.signUp(data);
      res.setHeader('set-cookie', [
        `refresh_token=${resp.refreshToken}; SameSite=None; Secure=true`,
      ]);
      delete resp.refreshToken;
      return { ...resp };
    } catch (e) {
      res.clearCookie('refresh_token');
      //log the error
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async findOne(@Req() req) {
    return req.user;
  }

  @Get('refresh')
  async refreshToken(
    @Req() request: Request,
    @Response({ passthrough: true }) res,
  ) {
    const rt = request.cookies['refresh_token'];
    const data = await this.authService.refreshToken(rt);
    if (!data) {
      res.clearCookie('refresh_token');
      throw new UnauthorizedException();
    }
    res.setHeader('set-cookie', [
      `refresh_token=${data.refreshToken}; SameSite=true; Path=/`,
    ]);
    return { access_token: data.accessToken, hi: 1 };
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('logout')
  async userLogout(@Req() request, @Response({ passthrough: true }) res) {
    const { uid } = request.user;
    try {
      await this.authService.logout(uid);
      res.clearCookie('refresh_token');
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException(e);
    }
  }
}
