import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ConfigService } from '@nestjs/config';
import { CacheService } from './cache.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: (config: ConfigService) =>({
        config: { 
          url: config.get("redis.url"),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}