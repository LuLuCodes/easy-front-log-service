import { env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('mongodb', () => ({
  uri: env('MONGODB_URI', ''),
}));
