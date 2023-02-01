import { Injectable } from '@nestjs/common';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redisAsCache: Redis, private readonly configService: ConfigService) { }

  public async getKey(key: string) {
    return await this.redisAsCache.get(key);
  }

  public async setKey(key: string, value: any) {
    return await this.redisAsCache.set(key, JSON.stringify(value), 'EX', this.configService.get("redis.ttl_seconds") );
  }

  public async invalidate(key: string) {
    return await this.redisAsCache.del(key);
  }
}