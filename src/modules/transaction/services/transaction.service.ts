import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Transaction } from '../../../common/entities/transaction.entity';
import { CreateTransactionDto } from '../../../common/dtos/createTransaction.dto';

@Injectable()
export class TransactionService {
  private logger = new Logger(TransactionService.name);

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async createTransaction(transaction: CreateTransactionDto) {
    try {
      const trans: Transaction = this.transactionRepository.create(transaction);
      await this.transactionRepository.save(trans);
      return trans;
    } catch (error) {
      this.logger.error({ error, method: 'createTransaction' });
      if (error.code === '23503') throw new BadRequestException(error.detail);
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async getTransactionByReceiver(receiverId: string) {
    try {
      const receiver: Transaction[] = await this.transactionRepository.findBy({
        receiver: receiverId,
      });

      if (receiver.length === 0)
        throw new NotFoundException(
          `no transactions found for receiver: '${receiverId}' `,
        );

      return receiver;
    } catch (error) {
      this.logger.error({ error, method: 'getTransactionByReceiver' });
      throw error;
    }
  }

  async getTransactionBySender(senderId: string) {
    try {
      const sender: Transaction[] = await this.transactionRepository.findBy({
        sender: senderId,
      });

      if (sender.length === 0)
        throw new NotFoundException(
          `no transactions found for sender: '${senderId}' `,
        );

      return sender;
    } catch (error) {
      this.logger.error({ error, method: 'getTransactionBySender' });
      throw error;
    }
  }
}
