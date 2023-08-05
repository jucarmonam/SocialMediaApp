import {
  Body,
  Controller,
  Get,
  Post as PostM,
  Query,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post, Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly posts: PostsService) {}

  @Get()
  async findForUser(
    @Query('user') user: string,
    @Query() { keyword, date }: Query,
  ): Promise<Post[]> {
    if (user) {
      return this.posts.findAllByUser(user, date);
    }
    return this.posts.findAll(keyword, date);
  }

  @PostM()
  async create(@Body() post: Prisma.PostCreateInput, @Request() req) {
    return this.posts.createPost(post, req.user.sub);
  }
}

type Query = { date?: Date; keyword?: string };
