import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsInt,
  IsDateString,
  Min,
  Max,
  IsArray,
  ArrayNotEmpty,
  IsOptional,
  IsEnum,
  Length,
  ValidateNested,
  MaxLength,
  MinLength,
  ArrayMaxSize,
  ArrayMinSize,
  IsEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QueryDTO, BaseDTO } from '@dto/BaseDTO';

export class CreateOpenApiLogDTO extends BaseDTO {
  @ApiProperty({
    description: 'app_key',
    type: String,
  })
  @IsString({ message: 'app_key必须为字符串' })
  @IsNotEmpty({ message: 'app_key不能为空字符串' })
  readonly app_key: string;

  @ApiProperty({
    description: 'from_ip',
    type: String,
  })
  @IsString({ message: 'from_ip必须为字符串' })
  @IsNotEmpty({ message: 'from_ip不能为空字符串' })
  readonly from_ip: string;

  @ApiProperty({
    description: 'url',
    type: String,
  })
  @IsString({ message: 'url必须为字符串' })
  @IsNotEmpty({ message: 'url不能为空字符串' })
  readonly url: string;

  @ApiProperty({
    description: 'method',
    type: String,
  })
  @IsString({ message: 'method必须为字符串' })
  @IsNotEmpty({ message: 'method不能为空字符串' })
  readonly method: string;

  @ApiPropertyOptional({
    description: 'request_session',
    type: Object,
  })
  @IsOptional()
  readonly request_session?: object;

  @ApiPropertyOptional({
    description: 'request_parms',
    type: Object,
  })
  @IsOptional()
  readonly request_parms?: object;

  @ApiPropertyOptional({
    description: 'request_query',
    type: Object,
  })
  @IsOptional()
  readonly request_query?: object;

  @ApiPropertyOptional({
    description: 'request_body',
    type: Object,
  })
  @IsOptional()
  readonly request_body?: object;

  @ApiPropertyOptional({
    description: 'referer',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'referer必须为字符串' })
  readonly referer?: string;

  @ApiPropertyOptional({
    description: 'ua',
    type: String,
  })
  @IsOptional()
  @IsString({ message: 'ua必须为字符串' })
  readonly ua?: string;

  @ApiPropertyOptional({
    description: 'response_status_code',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'response_status_code必须为有效整数' })
  readonly response_status_code?: number;

  @ApiPropertyOptional({
    description: 'response_data',
    type: Object,
  })
  @IsOptional()
  readonly response_data?: object;
}
