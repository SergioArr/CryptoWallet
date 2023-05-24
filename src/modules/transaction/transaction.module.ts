import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from '../../common/entities/transaction.entity';

import { TransactionController } from './controllers/transaction.controller';
import { TransactionService } from './services/transaction.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    controllers: [TransactionController],
    providers: [TransactionService]
})
export class TransactionModule {}
