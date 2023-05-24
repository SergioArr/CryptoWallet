import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Cryptocurrency } from '../../../common/entities/cryptocurrency.entity';

@Injectable()
export class CryptocurrencyService {
  private logger = new Logger(CryptocurrencyService.name);

  constructor(
    @InjectRepository(Cryptocurrency)
    private readonly cryptocurrencyRepository: Repository<Cryptocurrency>,
  ) {}

  async findCryptocurrency(id: number) {
    try {
      const options: FindOneOptions<Cryptocurrency> = { where: { id } };
      const crypto: Cryptocurrency =
        await this.cryptocurrencyRepository.findOne(options);

      if (!crypto)
        throw new NotFoundException(`cryptocurrency with id '${id}' not found`);

      return crypto;
    } catch (error) {
      this.logger.error({ error, method: 'findCryptocurrency' });
      throw error;
    }
  }
}
