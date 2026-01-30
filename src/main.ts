// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // ✅ Habilitar validação global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // ✅ Habilitar CORS para web e mobile
  app.enableCors({
    origin: '*', // ✅ Permite todas as origens (web, mobile, etc)
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ✅ IMPORTANTE: Escuta em 0.0.0.0 (permite acesso pela rede local)
  await app.listen(3000, '0.0.0.0');
  
  console.log('\n🚀 Backend rodando com sucesso!\n');
  console.log('📍 Endpoints disponíveis:');
  console.log('  🌐 Web:              http://localhost:3000');
  console.log('  🤖 Android Emulator: http://10.0.2.2:3000');
  console.log('  📱 Celular Físico:   http://192.168.1.4:3000');
  console.log('\n✅ CORS habilitado para todas as origens');
  console.log('✅ Escutando em 0.0.0.0 (acessível na rede local)\n');
}

bootstrap();
