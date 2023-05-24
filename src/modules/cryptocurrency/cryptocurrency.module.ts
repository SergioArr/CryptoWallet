import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cryptocurrency } from '../../common/entities/cryptocurrency.entity';
import { CryptocurrencyController } from './controllers/cryptocurrency.controller';
import { CryptocurrencyService } from './services/cryptocurrency.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cryptocurrency])],
  controllers: [CryptocurrencyController],
  providers: [CryptocurrencyService],
})
export class CryptocurrencyModule {}
