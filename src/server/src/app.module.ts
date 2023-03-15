import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ItemsModule } from './items/items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateItemsTable1677149813989 } from './migrations/create-items-table';
import { CreateCouponsTable1677149813989 } from './migrations/create-coupon-table';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PGHOST,
      port: Number(process.env.PGPORT),
      username: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      autoLoadEntities: true,
      migrations: [
        CreateItemsTable1677149813989,
        CreateCouponsTable1677149813989,
      ],
      migrationsRun: true,
    }),
    ItemsModule,
    CouponsModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
