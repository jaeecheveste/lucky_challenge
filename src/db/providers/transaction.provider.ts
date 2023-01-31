import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';

@Injectable()
export class TransactionProvider {
    constructor(@InjectDataSource() private readonly dataSource: DataSource) { }

    async executeTransaction(queryFn: Function): Promise<any> {
      const queryRunner = this.dataSource.createQueryRunner();

      await queryRunner.connect();
      await queryRunner.startTransaction();
  
      try {
        await queryFn(queryRunner);

        await queryRunner.commitTransaction();
      } catch (err) {
        await queryRunner.rollbackTransaction();
        throw err;
      } finally {
        await queryRunner.release();
      }
    }
}