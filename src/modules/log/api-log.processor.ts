import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as dayjs from 'dayjs';
import { CacheService } from '@service/cache.service';
import { ApiLogDocument } from './schema/api-log.schema';
@Processor('api-log')
export class ApiLogLogProcessor {
  constructor(
    @InjectModel('ApiLog') private apiLog: Model<ApiLogDocument>,
    private cacheService: CacheService,
  ) {}

  @Process()
  async handleLog(job: Job<any>) {
    try {
      const log_data = { ...job.data };
      log_data.display_time = `${dayjs(log_data.request_time).format(
        'YYYY-MM-DD HH:mm:ss',
      )}`;
      const createLog = new this.apiLog(log_data);
      await createLog.save();
    } catch (error) {
      console.error('handleLog: ', error);
    }
  }
}
