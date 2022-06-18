import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { join } from 'path';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';

import { SignGuard } from '@guard/sign.guard';
import { AuthGuard } from '@guard/auth.guard';
import { CacheService } from '@service/cache.service';
import { CronTaskService } from '@service/cron-task.service';
import { MqClientService } from '@service/mq.client.service';
import { HttpService } from '@service/http.service';

import { InitModule } from './init.module';
import { LogModule } from './modules/log/log.module';

import app_config from '@config/app';
import mongodb_config from '@config/mongodb';
import mysql_config from '@config/mysql';
import mq_config from '@config/mq';
import oss_config from '@config/oss';
import redis_config from '@config/redis';
import session_config from '@config/session';
import while_list from '@config/white-list';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        app_config,
        mongodb_config,
        mysql_config,
        mq_config,
        oss_config,
        redis_config,
        session_config,
        while_list,
      ],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<MongooseModuleFactoryOptions> => {
        return {
          uri: configService.get('mongodb.uri'),
          retryAttempts: 3,
          retryDelay: 500,
        };
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'www'),
      exclude: ['/api*'],
    }),
    HttpModule.registerAsync({
      useClass: HttpService,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<RedisModuleOptions> => {
        return {
          closeClient: true,
          config: {
            host: configService.get('redis.host'),
            port: configService.get('redis.port'),
            db: configService.get('redis.cache_db_index'),
          },
        };
      },
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
          db: configService.get('redis.queue_db_index'),
        },
      }),
    }),
    LogModule,
    InitModule,
    ScheduleModule.forRoot(),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SignGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    CacheService,
    CronTaskService,
    MqClientService,
  ],
})
export class AppModule {}
