import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TransactionModule } from './modules/transaction/transaction.module';
import { CryptocurrencyModule } from './modules/cryptocurrency/cryptocurrency.module';


@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: +process.env.POSTGRES_PORT || 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        autoLoadEntities: true,
        synchronize: true, //usado en ambiente de desarrollo
      }),
      TransactionModule,
      CryptocurrencyModule,
    ],
})

export class AppModule {}