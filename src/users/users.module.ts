import { Module } from '@nestjs/common';
import { CacheModule } from 'src/cache/cache.module';
import { RepositoryModule } from 'src/db/repository.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [CacheModule, RepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
