import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.AdminCreateInput) {
    const saltOrRounds = 10;
    const password = data.pass;
    const hash_pass = await bcrypt.hash(password, saltOrRounds);
    data.pass = hash_pass;

    return await this.prisma.admin.create({
      data,
    });
  }

  // async findAll() {
  //   const data = await this.prisma.user.findMany();
  //   return data;
  // }

  async findOne(where?: Prisma.AdminWhereUniqueInput) {
    return await this.prisma.admin.findFirst({ where: where });
  }

  async update(uid: number, data: UpdateUserDto) {
    return await this.prisma.admin.update({
      data: data,
      where: { id: +uid },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async updateUsertRT(newRT: string, uid: string) {
    return await this.prisma.admin.update({
      data: { refresh_token: newRT },
      where: { id: +uid },
    });
  }
}
