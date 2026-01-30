"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
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
//# sourceMappingURL=main.js.map