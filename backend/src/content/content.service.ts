import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer';

@Injectable()
export class ContentService {
  constructor(private prisma: PrismaService) {}

  async uploadTrack(file: Express.Multer.File, userId: string, title: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Artist: true }
    });

    if (!user || !user.isArtist || !user.Artist) {
      throw new Error('User is not associated with an artist');
    }

    const artistId = user.Artist.id;
    const fileName = `${title}.mp3`;


    const uploadsDir = path.join(process.cwd(), 'uploads', artistId);
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const uploadPath = path.join(uploadsDir, fileName);
    fs.writeFileSync(uploadPath, file.buffer);

    return this.prisma.track.create({
      data: {
        title,
        artistId,
        audio: uploadPath,
      },
    });
  }
}
