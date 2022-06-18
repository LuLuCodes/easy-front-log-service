import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { CacheService } from '@service/cache.service';
import { CreateOpenApiLogDTO } from './log.dto';
import * as _ from 'lodash';

@Injectable()
export class OpenApiLogService {
  constructor(
    @InjectQueue('open-api-log') private logQueue: Queue,
    private cacheService: CacheService,
  ) {}

  // 添加
  async create(logDto: CreateOpenApiLogDTO): Promise<void> {
    await this.logQueue.add(logDto, {
      attempts: 3,
      delay: 20,
      removeOnComplete: true,
      removeOnFail: true,
    });
  }
}
