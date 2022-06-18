import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  Param,
  UsePipes,
  Session,
  Headers,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiBody, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { ValidationPipe } from '@pipe/validation.pipe';
import { CatchError } from '@decorator/catch.decorator';
import { CacheService } from '@service/cache.service';
import { OpenApiLogService } from './open-api-log.service';

import { CreateOpenApiLogDTO } from './log.dto';

@ApiTags('Log API')
@ApiHeader({
  name: 'x-from-swagger',
  description: '如果是swagger发送的请求，会跳过token和sign验证',
  example: 'swagger',
  schema: {
    type: 'string',
    example: 'swagger',
  },
})
@Controller('log')
export class LogController {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
    private readonly openApiLogService: OpenApiLogService,
  ) {}

  @ApiOperation({
    summary: '新增open api日志',
    description: '新增open api日志',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateOpenApiLogDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-open-api-log')
  @CatchError()
  async setJdOrderLog(@Body() body: CreateOpenApiLogDTO): Promise<any> {
    const response = await this.openApiLogService.create(body);
    return response;
  }
}
