import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheService } from '@service/cache.service';
// import { CacheKey } from '@config/global';
// import * as fs from 'fs';
// import { resolve } from 'path';

@Module({
  imports: [ConfigModule],
  providers: [CacheService],
})
export class InitModule implements OnModuleInit {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}
  async onModuleInit(): Promise<void> {
    console.log('call module init');
  }
}
