import { CurrentUser } from './../common/decorators/user.decorator';
import { AuthService } from './../auth/auth.service';
import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UseFilters,
  UseGuards,
  Body,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatRequestDto } from './dto/cats.request.dto';
import { CatsService } from './cats.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadonlyCatDto } from './dto/cats.readonly.dto';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { jwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  //cats
  @ApiOperation({ summary: '현재 고양이 가져오기' })
  @UseGuards(jwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat) {
    return cat.readonlyCatDto;
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
    return await this.catsService.singUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @Post('upload/cats')
  uploadCatImg() {
    return 'upload cat image';
  }
}
