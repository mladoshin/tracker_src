import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';
import { jwtConstants } from './constants';
import { Prisma, Admin } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<Admin, 'id' | 'email' | 'name'>;
  }> {
    const user = await this.usersService.findOne({ email: username });

    // const saltOrRounds = 10;
    // const hash_pass = await bcrypt.hash(password, saltOrRounds);
    if (!bcrypt.compareSync(password, user.pass)) {
      throw new UnauthorizedException();
    }
    // TODO: Generate a JWT and return it here
    // instead of the user object
    const payload = { uid: user.id, username: user.email, name: user.name };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: env['REFRESH_TOKEN_SECRET'],
    });

    this.usersService.updateUsertRT(refreshToken, JSON.stringify(user.id));

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '10m',
        secret: env['JWT_SECRET'],
      }),
      refreshToken,
      user: { id: user.id, email: user.email, name: user.name },
    };
  }

  async signUp(data: Prisma.AdminCreateInput): Promise<{
    accessToken: string;
    refreshToken: string;
    user: Pick<Admin, 'id' | 'email' | 'name'>;
  }> {
    const user = await this.usersService.create(data);
    const payload = { uid: user.id, username: user.email, name: user.name };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
      secret: env['REFRESH_TOKEN_SECRET'],
    });

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '10m',
      secret: env['JWT_SECRET'],
    });

    this.usersService.updateUsertRT(refreshToken, JSON.stringify(user.id));

    delete user.pass;
    delete user.refresh_token;
    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  async refreshToken(
    rt: string,
  ): Promise<{ accessToken: string; refreshToken: string } | null> {
    try {
      const payload = await this.jwtService.verifyAsync(rt, {
        secret: jwtConstants.rt_secret,
      });

      const { uid, name, username } = payload;
      const data = await this.usersService.findOne({ id: uid });
      if (data.refresh_token !== rt) {
        throw new UnauthorizedException();
      }
      const new_at = await this.jwtService.signAsync(
        { uid, username, name },
        {
          expiresIn: '10m',
          secret: env['JWT_SECRET'],
        },
      );

      const new_rt = await this.jwtService.signAsync(
        { uid, username, name },
        {
          expiresIn: '7d',
          secret: env['REFRESH_TOKEN_SECRET'],
        },
      );

      this.usersService.updateUsertRT(new_rt, JSON.stringify(uid));

      return { accessToken: new_at, refreshToken: new_rt };
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async logout(uid: string) {
    return await this.usersService.update(+uid, { refresh_token: null });
  }
}
