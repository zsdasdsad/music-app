import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    return this.prisma.user.findMany({
      include: {
        Artist: true,
      },
    });
  }

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  
  async setAdmin(username: string) {
    return this.prisma.user.update({
      where: { username: username },
      data: { isAdmin: true },
    });
  }

  async setArtist(username: string, artistName: string) {
    return this.prisma.user.update({
      where: { username: username },
      data: { isArtist: true, Artist: {
        create: {
          name: artistName,
        },
      },
       },
    });
  }

  async sendArtistRequest(userId: string, name: string) {
    return this.prisma.artistRoleRequest.create({
      data: {
        userId: userId,
        name: name,
      },
    });
  }

  async handleArtistRequest(requestId: string, status: string) {
    const request = await this.prisma.artistRoleRequest.findUnique({
      where: { id: requestId },
    });

    if (!request) {
      throw new Error('Artist request not found');
    }

    if (status === 'approve') {
      await this.prisma.user.update({
        where: { id: request.userId },
        data: { isArtist: true, Artist: {
          create: {
            name: request.name,
          },
        }},
      });
      return this.prisma.artistRoleRequest.update({
        where: { id: requestId },
        data: { status: 'APPROVED' },
      });
    }
    return this.prisma.artistRoleRequest.update({
      where: { id: requestId },
      data: { status: 'REJECTED' },
    });
  }

  async getArtistRequests(userId: string) {
    return this.prisma.artistRoleRequest.findMany({
      where: { userId: userId },
    });
  }
}

