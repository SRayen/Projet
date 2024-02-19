import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Only allows properties explicitly defined in DTO
      forbidNonWhitelisted: true, // Rejects any property not explicitly allowed
      transform: true, // Automatically transforms data based on decorators
    }),
  );
  await app.listen(5000);
}
bootstrap();
