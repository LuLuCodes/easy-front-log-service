import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import * as dayjs from 'dayjs';
import { CacheService } from '@service/cache.service';
import { OpenApiLogDocument } from './schema/open-api-log.schema';
@Processor('open-api-log')
export class OpenApiLogLogProcessor {
  constructor(
    @InjectModel('OpenApiLog') private openApiLog: Model<OpenApiLogDocument>,
    private cacheService: CacheService,
  ) {}

  @Process()
  async handleLog(job: Job<any>) {
    try {
      const log_data = { ...job.data };
      log_data.display_time = `${dayjs(log_data.request_time).format(
        'YYYY-MM-DD HH:mm:ss',
      )}`;
      log_data.created_at = new Date();
      const createLog = new this.openApiLog(log_data);
      await createLog.save();
    } catch (error) {
      console.error('handleLog: ', error);
    }
  }
}
