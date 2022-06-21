import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { LogController } from './log.controller';
import { OpenApiLogService } from './open-api-log.service';
import { ApiLogService } from './api-log.service';
import { CacheService } from '@service/cache.service';
import { OpenApiLogLogProcessor } from './open-api-log.processor';
import { ApiLogLogProcessor } from './api-log.processor';
import { OpenApiLog, OpenApiLogSchema } from './schema/open-api-log.schema';
import { ApiLog, ApiLogSchema } from './schema/api-log.schema';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue(
      {
        name: 'open-api-log',
      },
      {
        name: 'api-log',
      },
    ),
    MongooseModule.forFeature([
      { name: OpenApiLog.name, schema: OpenApiLogSchema },
      { name: ApiLog.name, schema: ApiLogSchema },
    ]),
  ],
  controllers: [LogController],
  providers: [
    OpenApiLogService,
    ApiLogService,
    CacheService,
    OpenApiLogLogProcessor,
    ApiLogLogProcessor,
  ],
})
export class LogModule {}
