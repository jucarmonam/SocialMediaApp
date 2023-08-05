import { Injectable } from '@nestjs/common';
import { Post, Prisma } from '@prisma/client';
import { UserNotFound } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllByUser(userEmail: string, date?: Date): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        author: {
          email: userEmail,
        },
        createdAt: date,
      },
    });
  }

  async findAll(keyword: string = '', date?: Date): Promise<Post[]> {
    return this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: { contains: keyword, mode: 'insensitive' },
          },
          { createdAt: date },
        ],
      },
    });
  }

  async createPost(data: Prisma.PostCreateInput, email: string): Promise<Post> {
    return this.prisma.post.create({
      data: { author: { connect: { email } }, ...data },
    });
  }
}
