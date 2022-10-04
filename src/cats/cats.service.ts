import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CatRequestDto } from './cats.request.dto';
import { Cat } from './cats.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

  async singUp(body: CatRequestDto) {
    const { email, name, password } = body;
    const isCatExist = await this.catModel.exists({ email });

    // 유효성 검사 - 이메일 중복확인
    if (isCatExist) {
      throw new UnauthorizedException('해당하는 이메일는 이미 존재합니다.'); //403 error
    }

    // password 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 데이터 저장
    const cat = await this.catModel.create({
      email,
      name,
      password: hashedPassword,
    });

    // mongoose document 형식을 pojo 형식으로 변경해줌
    // const cat = await this.catModel.findOne().lean();

    return cat.readOnlyData;
  }
}
