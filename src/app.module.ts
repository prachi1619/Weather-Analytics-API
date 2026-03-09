import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmConfig } from 'config/typeorm.config';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({    type:'postgres',
    host:'localhost',
    port:5432,
    username: 'postgres',
    password:'Prachi@123',
    database:'postgres',
    autoLoadEntities:true,
    synchronize:true}),
    WeatherModule,
  ],
})
export class AppModule {}
