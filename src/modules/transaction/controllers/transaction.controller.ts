import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { TransactionService } from '../services/transaction.service';
import { CreateTransactionDto } from '../../../common/dtos/createTransaction.dto';
import { GetTransactionDto } from 'src/common/dtos/getTransaction.dto';
import { Transaction } from 'src/common/entities/transaction.entity';

@ApiTags('transaction')
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create Transaction' })
  @ApiBody({ type: CreateTransactionDto })
  createTransaction(@Body() transaction: CreateTransactionDto): Promise<GetTransactionDto> {
    return this.transactionService.createTransaction(transaction);
  }

  @Get('receiver/:receiverId')
  @ApiOperation({ summary: 'Search transactions by receiver id' })
  getTransactionByReceiver(
    @Param('receiverId') receiverId: string,
  ): Promise<GetTransactionDto[]> {
    return this.transactionService.getTransactionByReceiver(receiverId);
  }

  @Get('sender/:senderId')
  @ApiOperation({ summary: 'Search transactions by sender id' })
  getTransactionBySender(
    @Param('senderId') senderId: string,
  ): Promise<GetTransactionDto[]> {
    return this.transactionService.getTransactionBySender(senderId);
  }
}
