import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronTaskService {
  // constructor() {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron() {
    console.log('this is cron task');
  }
}
