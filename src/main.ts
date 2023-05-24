import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: (errors: ValidationError[]) => {
      const errorMessage = errors.map((error: ValidationError) => {
        const constraints = error.constraints;
        if (constraints) {
          return Object.values(constraints).join(', ');
        }
        return '';
      });
      return new BadRequestException(errorMessage);
    },
  }));

  const config = new DocumentBuilder()
    .setTitle('Crypto Wallet API')
    .setDescription('API for managing cryptocurrencies')
    .setVersion('1.0')
    .addTag('Wallet')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('crypto', app, document);

  
  await app.listen(3000);
}
bootstrap();
