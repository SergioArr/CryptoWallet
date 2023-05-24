import { ApiProperty } from '@nestjs/swagger';
import { Cryptocurrency } from '../entities/cryptocurrency.entity';
import { TransactionInterface } from '../interface/transaction.interface';
import { Transform } from 'class-transformer';

export class GetTransactionDto implements TransactionInterface {
  @ApiProperty()
  id: number;

  @ApiProperty()
  cryptocurrency_id: number;

  @ApiProperty()
  sender: string;

  @ApiProperty()
  receiver: string;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value.toFixed(8)))
  amount: number;

  @ApiProperty()
  createdDate: Date;

  @ApiProperty()
  updatedDate: Date;

  @ApiProperty()
  deletedDate: Date;

  @ApiProperty()
  cryptocurrency: Cryptocurrency;
}
