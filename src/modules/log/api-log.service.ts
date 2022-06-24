import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CacheService } from '@service/cache.service';
import { CreateApiLogDTO, QueryApiLogDTO } from './log.dto';
import { ApiLog, ApiLogDocument } from './schema/api-log.schema';
import * as _ from 'lodash';

@Injectable()
export class ApiLogService {
  constructor(
    @InjectModel('ApiLog')
    private apiLog: Model<ApiLogDocument>,
    @InjectQueue('api-log') private logQueue: Queue,
    private cacheService: CacheService,
  ) {}

  // 添加
  async create(logDto: CreateApiLogDTO): Promise<void> {
    await this.logQueue.add(logDto, {
      attempts: 3,
      delay: 20,
      removeOnComplete: true,
      removeOnFail: true,
    });
  }

  // 查询
  async query(queryDto: QueryApiLogDTO): Promise<any> {
    const { from_ip, url, start_time, end_time, sort, filter } = queryDto;
    let query: any = {};
    if (start_time || end_time) {
      if (start_time && end_time && start_time > end_time) {
        throw new Error('开始时间不能大于结束时间');
      }
      query.request_time = {};
      if (start_time) {
        query.request_time.$gte = new Date(start_time).getTime();
      }
      if (end_time) {
        query.request_time.$lte = new Date(end_time).getTime();
      }
    }
    if (from_ip) {
      query.from_ip = from_ip;
    }
    if (url) {
      query.url = url;
    }
    if (filter) {
      query = { ...query, ...filter };
    }
    let query_sort: any = { request_time: 1 };
    if (sort) {
      query_sort = { ...query_sort, ...sort };
    }

    const total: number = await this.apiLog.countDocuments(query);
    const list = await this.apiLog
      .find(query)
      .sort(query_sort)
      .skip((queryDto.page_num - 1) * queryDto.page_size)
      .limit(queryDto.page_size)
      .exec();
    return { total, list, page_num: queryDto.page_num };
  }
}
