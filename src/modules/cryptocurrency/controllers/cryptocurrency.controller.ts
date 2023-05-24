import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { CryptocurrencyService } from '../services/cryptocurrency.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { GetCryptocurrencyDto } from 'src/common/dtos/getCryptocurrency.dto';

@ApiTags('cryptocurrency')
@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Search a cryptocurrency by Id' })
  @ApiParam({ name: 'id', description: 'ID of the cryptocurrency' })
  findCryptocurrency(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetCryptocurrencyDto> {
    return this.cryptocurrencyService.findCryptocurrency(id);
  }
}
