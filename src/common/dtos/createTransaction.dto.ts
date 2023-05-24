import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString} from 'class-validator';
import { MaxDecimals } from '../validators/maxDecimals';

export class CreateTransactionDto {

  @ApiProperty({ example: 1, description: 'cryptocurrency id' })
  @IsNotEmpty()
  @IsNumber()
  cryptocurrency_id: number;

  @ApiProperty({ example: 'aaaa-bbbb-cccc-dddd', description: 'sender id' })
  @IsNotEmpty()
  @IsString()
  sender: string;

  @ApiProperty({ example: 'dddd-cccc-bbbb-aaaa', description: 'receiver id' })
  @IsNotEmpty()
  @IsString()
  receiver: string;

  @ApiProperty({ example: 10.5, description: 'transaction amount' })
  @IsNotEmpty()
  @IsNumber()
  @MaxDecimals(8)
  amount: number;

}
