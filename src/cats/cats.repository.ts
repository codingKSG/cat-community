import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat } from './cats.schema';
import { CatRequestDto } from './dto/cats.request.dto';

@Injectable()
export class CatsReopsitory {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async create(cat: CatRequestDto): Promise<Cat> {
    const result = await this.catModel.create(cat);
    return result;
  }

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.catModel.exists({ email });
      return result ? true : false;
    } catch (error: any) {
      throw new HttpException('db error...', 400);
    }
  }

  async findCatByEmail(email: string): Promise<Cat | null> {
    const cat = await this.catModel.findOne({ email });
    return cat;
  }

  async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
    const cat = await this.catModel.findById(catId).select('-password');
    return cat;
  }
}
