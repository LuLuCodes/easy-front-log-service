import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  Min,
  Max,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class BaseDTO {
  @ApiPropertyOptional({
    description: '时间戳',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'timestamp必须为有效整数' })
  readonly timestamp?: number;

  @ApiPropertyOptional({
    description: '签名',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'sign必须为字符串' })
  readonly sign?: string;
}

export class QueryDTO extends BaseDTO {
  @ApiPropertyOptional({
    description: 'pageNum页面(1开始)',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'pageNum必须为必须为有效整数' })
  @Min(1, { message: 'pageNum应大于等于1' })
  readonly page_num = 1;

  @ApiPropertyOptional({
    description: 'pageSize页面(1开始)',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'pageSize必须为必须为有效整数' })
  @Min(1, { message: 'pageSize应大于等于1' })
  @Max(1000, { message: 'pageSize应小于等于1000' })
  readonly page_size = 10;
}
