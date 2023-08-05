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

  async findAll(keyword?: string, date?: Date): Promise<Post[]> {
    if(date){
        date = date ? new Date(date) : null
        date.setUTCHours(0,0,0,0)
    }
    return this.prisma.post.findMany({
      where: {
        AND: [ keyword ? {
            title: { contains: keyword, mode: 'insensitive' },
          } : {},
          date ? {
            createdAt: {
                gte: date,
                lt: new Date(date.getTime() + 24 * 60 * 60 * 1000), // Add 24 hours to include the entire day
            },
        } : {}
        ],
      },
    });
  }

  async createPost(data: Prisma.PostCreateInput, email: string): Promise<Post> {
    return this.prisma.post.create({
      data: { author: { connect: { email } }, createdAt: new Date(), ...data },
    });
  }
}
