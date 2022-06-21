import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '@service/cache.service';
import { CreateOpenApiLogDTO, QueryOpenApiLogDTO } from './log.dto';
import { OpenApiLog, OpenApiLogDocument } from './schema/open-api-log.schema';
import * as _ from 'lodash';

@Injectable()
export class OpenApiLogService {
  constructor(
    @InjectModel('OpenApiLog') private openApiLog: Model<OpenApiLogDocument>,
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

  // 查询
  async query(queryDto: QueryOpenApiLogDTO): Promise<any> {
    const { app_key, from_ip, url, start_time, end_time, sort, filter } =
      queryDto;
    if (start_time > end_time) {
      throw new Error('开始时间不能大于结束时间');
    }
    let query: any = {
      app_key,
      display_time: { $gte: start_time, $lte: end_time },
    };
    if (from_ip) {
      query.from_ip = from_ip;
    }
    if (url) {
      query.url = url;
    }
    if (filter) {
      query = { ...query, filter };
    }
    let query_sort: any = { request_time: 1 };
    if (sort) {
      query_sort = { ...query_sort, ...sort };
    }

    const total: number = await this.openApiLog.countDocuments(query);
    const list = await this.openApiLog
      .find(query)
      .sort(query_sort)
      .skip((queryDto.page_num - 1) * queryDto.page_size)
      .limit(queryDto.page_size)
      .exec();
    return { total, list, page_num: queryDto.page_num };
  }
}
