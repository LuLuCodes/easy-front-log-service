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
import { ApiLogService } from './api-log.service';

import {
  CreateApiLogDTO,
  QueryApiLogDTO,
  CreateOpenApiLogDTO,
  QueryOpenApiLogDTO,
} from './log.dto';

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
    private readonly apiLogService: ApiLogService,
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
  async createOpenApiLog(@Body() body: CreateOpenApiLogDTO): Promise<any> {
    const response = await this.openApiLogService.create(body);
    return response;
  }

  @ApiOperation({
    summary: '查询open api日志',
    description: '查询open api日志',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryOpenApiLogDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('query-open-api-log')
  @CatchError()
  async queryOpenApiLog(@Body() body: QueryOpenApiLogDTO): Promise<any> {
    const response = await this.openApiLogService.query(body);
    return response;
  }

  @ApiOperation({
    summary: '新增 api  日志',
    description: '新增 api 日志',
  })
  @ApiBody({
    description: '请求参数',
    type: CreateApiLogDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('create-api-log')
  @CatchError()
  async createApiServiceLog(@Body() body: CreateApiLogDTO): Promise<any> {
    const response = await this.apiLogService.create(body);
    return response;
  }

  @ApiOperation({
    summary: '查询 api 日志',
    description: '查询 api 日志',
  })
  @ApiBody({
    description: '请求参数',
    type: QueryApiLogDTO,
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('query-api-log')
  @CatchError()
  async queryApiLog(@Body() body: QueryApiLogDTO): Promise<any> {
    const response = await this.apiLogService.query(body);
    return response;
  }
}
