import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Body, Req, Get } from '@nestjs/common';
import { ContentService } from './content.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArtistGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlbumType } from '@prisma/client';

@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService, private prisma: PrismaService) {}

    @UseGuards(AccessTokenGuard, ArtistGuard)
    @Post('uploadTrack')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTrack(
        @UploadedFile() file: Express.Multer.File, 
        @Req() req: Request & { user: any },
        @Body('title') title: string
    ) {
        const user = req.user['userId'];
        return this.contentService.uploadTrack(file, user, title);
    }

    @UseGuards(AccessTokenGuard, ArtistGuard)
    @Post('sendAlbumRequest')
    async sendAlbumRequest(
        @Req() req: Request & { user: any },
        @Body('title') title: string,
        @Body('releaseDate') releaseDate: Date,
        @Body('type') type: AlbumType,
        @Body('logo') logo: string,
        @Body('tracks') tracks: {trackId: string, order: number}[]
    ) {
        const user = await this.prisma.user.findUnique({
            where: { id: req.user.userId },
            include: { Artist: true }
        });

        if (!user?.Artist) {
            throw new Error('User is not an artist');
        }

        return this.contentService.sendAlbumRequest(
            user.Artist.id,
            title,
            releaseDate,
            type,
            logo,
            tracks
        );
    }

    @UseGuards(AccessTokenGuard, ArtistGuard)
    @Get('artistTracks')
    async getArtistTracks(@Req() req: Request & { user: any }) {
        const user = await this.prisma.user.findUnique({
            where: { id: req.user.userId },
            include: { Artist: true }
        });

        if (!user?.Artist) {
            throw new Error('User is not an artist');
        }

        return this.contentService.getArtistTracks(user.Artist.id);
    }

    @UseGuards(AccessTokenGuard)
    @Post('likeTrack')
    async likeTrack(@Req() req: Request & { user: any }, @Body('trackId') trackId: string) {
        const user = req.user['userId'];
        return this.contentService.likeTrack(user, trackId);
    }

    @UseGuards(AccessTokenGuard)
    @Post('likeAlbum')
    async likeAlbum(@Req() req: Request & { user: any }, @Body('albumId') albumId: string) {
        const user = req.user['userId'];
        return this.contentService.likeAlbum(user, albumId);
    }
    
    @UseGuards(AccessTokenGuard)
    @Get('likedTracks')
    async getLikedTracks(@Req() req: Request & { user: any }) {
        const user = req.user['userId'];
        return this.contentService.getLikedTracks(user);
    }

    @UseGuards(AccessTokenGuard)
    @Get('likedAlbums')
    async getLikedAlbums(@Req() req: Request & { user: any }) {
        const user = req.user['userId'];
        return this.contentService.getLikedAlbums(user);
    }
}
