import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AdminModule } from './admin/admin.module';
import { SupervisorModule } from './supervisor/supervisor.module';
import { PastorModule } from './pastor/pastor.module';
import { LiderModule } from './lider/lider.module';
import { MembroModule } from './membro/membro.module';
import { VisitanteModule } from './visitante/visitante.module';
import { PostsModule } from './posts/posts.module';
import { NeighborhoodsModule } from './neighborhoods/neighborhoods.module';
import { CellsModule } from './cells/cells.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    UsersModule,
    RolesModule,
    AdminModule,
    SupervisorModule,
    PastorModule,
    LiderModule,
    MembroModule,
    VisitanteModule,
    PostsModule,
    NeighborhoodsModule,
    CellsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
