import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';
import { ContentService } from './content.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports: [UsersModule, PrismaModule],
  controllers: [ContentController],
  providers: [ContentService]
})
export class ContentModule {}
