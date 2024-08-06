import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(user: UserDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userExists) {
      throw new HttpException('User already exists.', HttpStatus.CONFLICT);
    }

    const data: Prisma.UserCreateInput = {
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10),
    };
    
    const createdUser = await this.prisma.user.create({ data });
 
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async returnAnUserByEmail(email: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new HttpException(
        'This user does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updatePassword(email: string, password: string) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userExists) {
      throw new HttpException(
        'This user does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      }
    })
  }
}
