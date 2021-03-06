import { envNumber, env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  node_env: env('NODE_ENV', 'development'),
  name: env('APP_NAME', 'easy-front-log-service'),
  desc: env('APP_DESC', '基于Nest和MongoDB的日志服务'),
  version: env('APP_VERSION', '1.0.0'),
  port: envNumber('APP_PORT', 8000),
}));
