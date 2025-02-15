import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer';
import { AlbumType } from '@prisma/client';

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

  async sendAlbumRequest(artistId: string, title: string, releaseDate: Date, type: AlbumType, logo: string, tracks: {trackId: string, order: number}[]) {
       return this.prisma.$transaction(async (prisma) => {
         const album = await prisma.album.create({
           data: {
             title,
             releaseDate,
             type,
             logo,
             artist: {
               connect: { id: artistId },
             },
           },
         });

         const trackOnAlbumData = tracks.map(track => ({
           albumId: album.id,
           trackId: track.trackId,
           order: track.order,
         }));

         await prisma.trackOnAlbum.createMany({
           data: trackOnAlbumData,
           skipDuplicates: true,
         });

         return album;
  });
}

async getAlbumRequests() {
  return this.prisma.albumRequest.findMany({
    include: {
      artist: true,
    },
  });
}

async getAlbums() {
  return this.prisma.album.findMany({
    include: {
      artist: true,
      tracks: true,
    },
  });
}

async getArtistTracks(artistId: string) {
  return this.prisma.track.findMany({
    where: { artistId },
  });
}

}
