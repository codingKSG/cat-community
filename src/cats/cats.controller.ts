import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UseFilters,
  Body,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadonlyCatDto } from './dto/cats.readonly.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  //cats
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current cat';
  }

  @ApiResponse({
    status: 200,
    description: '성공!',
    type: ReadonlyCatDto,
  })
  @ApiResponse({
    status: 500,
    description: '실패!',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    const result = await this.catsService.singUp(body);
    return result;
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn() {
    return '';
  }

  @ApiOperation({ summary: '로그아웃' })
  @Post('logout')
  logOut() {
    return 'logout';
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload cat image';
  }
}
