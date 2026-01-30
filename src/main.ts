import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // 🚀 RAILWAY + LOCAL
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  
  const port = process.env.PORT || 3000;
  console.log(`\n🚀 Backend rodando na porta ${port}!`);
  console.log('📍 http://localhost:' + port);
}

bootstrap();
