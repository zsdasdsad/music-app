import { Controller, Post, UseInterceptors, UploadedFile, UseGuards, Body, Req } from '@nestjs/common';
import { ContentService } from './content.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { ArtistGuard } from 'src/auth/guards/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';


@Controller('content')
export class ContentController {
    constructor(private contentService: ContentService, private prisma: PrismaService) {}

    @UseGuards(AccessTokenGuard, ArtistGuard)
    @Post('upload-track')
    @UseInterceptors(FileInterceptor('file'))
    async uploadTrack(
        @UploadedFile() file: Express.Multer.File, 
        @Req() req: Request & { user: any },
        @Body('title') title: string
    ) {
        const user = req.user['userId'];
        return this.contentService.uploadTrack(file, user, title);
    }

}
