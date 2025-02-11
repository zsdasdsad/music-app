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
  @Get('/all')
  getAllUsers() {
    return this.usersService.getAllUsers();
  } 

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Post('/setAdmin')
  setAdmin(@Body('username') username: string) {
    return this.usersService.setAdmin(username);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Post('/setArtist')
  setArtist(
    @Body('username') username: string,
    @Body('artistName') artistName: string,
    ) {
    return this.usersService.setArtist(username, artistName);
  }

  @UseGuards(AccessTokenGuard)
  @Post('/sendArtistRequest')
  sendArtistRequest(@Req() req: Request & { user: any }, @Body('name') name: string) {
    const userId = req.user['userId'];
    return this.usersService.sendArtistRequest(userId, name);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Get('/artistRequests')
  getArtistRequests(@Body('userId') userId: string) {
    return this.usersService.getArtistRequests(userId);
  }

  @UseGuards(AccessTokenGuard, AdminGuard)
  @Post('/handleArtistRequest')
  handleArtistRequest(@Body('requestId') requestId: string, @Body('status') status: string) {
    return this.usersService.handleArtistRequest(requestId, status);
  }

}
