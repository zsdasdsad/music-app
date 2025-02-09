import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }
  
  async setAdmin(username: string) {
    return this.prisma.user.update({
      where: { username: username },
      data: { isAdmin: true },
    });
  }

  async setArtist(username: string) {
    return this.prisma.user.update({
      where: { username: username },
      data: { isArtist: true },
    });
  }

  async artistRequest(username: string) {}
}

