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
    description: 'host',
    type: String,
  })
  @IsString({ message: 'host必须为字符串' })
  @IsNotEmpty({ message: 'host不能为空字符串' })
  readonly host: string;

  @ApiProperty({
    description: 'path',
    type: String,
  })
  @IsString({ message: 'path必须为字符串' })
  @IsNotEmpty({ message: 'path不能为空字符串' })
  readonly path: string;

  @ApiProperty({
    description: 'method',
    type: String,
  })
  @IsString({ message: 'method必须为字符串' })
  @IsNotEmpty({ message: 'method不能为空字符串' })
  readonly method: string;

  @ApiPropertyOptional({
    description: 'request_parms',
    type: Object,
  })
  @IsOptional()
  readonly request_parms?: object;

  @ApiPropertyOptional({
    description: 'response_status_code',
    type: Number,
  })
  @IsOptional()
  @IsInt({ message: 'response_status_code必须为有效整数' })
  readonly response_status_code?: number;

  @ApiPropertyOptional({
    description: 'response_parms',
    type: Object,
  })
  @IsOptional()
  readonly response_parms?: object;
}
