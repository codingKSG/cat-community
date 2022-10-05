import { Cat } from '../cats.schema';
import { PickType } from '@nestjs/swagger';

// PickType : 필요한 데이터만 상속 받기
// OmitType : 필요없는 데이터 뺴고 상속 받기
export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
