import {
  Injectable,
  CanActivate,
  HttpException,
  HttpStatus,
  ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheService } from '@service/cache.service';
import { md5 } from '@libs/cryptogram';
import { CacheKey } from '@config/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly cacheService: CacheService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;

    if (headers['x-from-swagger'] === 'swagger') {
      return true;
    }

    return true;
  }
}
