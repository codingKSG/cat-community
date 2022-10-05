import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cats.schema';

// PickType : 필요한 데이터만 상속 받기
// OmitType : 필요없는 데이터 뺴고 상속 받기
export class ReadonlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: '633bc9a',
    description: 'id',
  })
  id: string;
}
