import { CatsReopsitory } from './../../cats/cats.repository';
import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comments } from '../comments.schema';
import { CommentsCreateDto } from '../dtos/comments.create.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
    private readonly catsRepository: CatsReopsitory,
  ) {}

  async getAllComments() {
    try {
      const comments = await this.commentsModel.find();
      return comments;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createComment(@Param('id') id: string, comments: CommentsCreateDto) {
    try {
      //cats 확인 및 위변조 방지
      const targetCat = await this.catsRepository.findCatByIdWithoutPassword(
        id,
      );
      const { contents, author } = comments; //구조분해 할당
      //author 확인 및 위변조 방지
      const validatedAuthor =
        await this.catsRepository.findCatByIdWithoutPassword(author);
      const newContent = new this.commentsModel({
        author: validatedAuthor._id,
        contents,
        info: targetCat._id,
      });
      return await newContent.save();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async plusLike(id: string) {
    try {
      const comment = await this.commentsModel.findById(id);
      comment.likeCount += 1;
      return await comment.save();
    } catch (error) {}
  }
}
