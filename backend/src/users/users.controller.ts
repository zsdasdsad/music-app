import { Controller, Get, Post, Req, UseGuards, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { AccessTokenGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from 'express';
import { AdminGuard, ArtistGuard } from 'src/auth/guards/roles.guard';




@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AccessTokenGuard)
  @Get('/profile')
  getProfile(@Req() req: Request & { user: any }) {
    const user = req.user['userId'];
    return this.usersService.getUserById(user);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Post('/setAdmin')
  setAdmin(@Body('username') username: string) {
    return this.usersService.setAdmin(username);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Post('/setArtist')
  setArtist(@Body('username') username: string) {
    return this.usersService.setArtist(username);
  }
}
