import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CacheService } from '@service/cache.service';
import { OpenApiLogDocument } from './schema/open-api-log.schema';
@Processor('open-api-log')
export class OpenApiLogLogProcessor {
  constructor(
    @InjectModel('OpenApiLog') private openApiLog: Model<OpenApiLogDocument>,
    private cacheService: CacheService,
  ) {}

  @Process()
  async handleTranscode(job: Job<unknown>) {
    const createLog = new this.openApiLog(job.data);
    return await createLog.save();
  }
}
