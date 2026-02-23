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
    // TypeOrmModule.forRoot({
    //       type:'postgres',
    // host:process.env.DB_HOST,
    // port:Number(process.env.DB_PORT),
    // username: process.env.DB_USER,
    // password:process.env.DB_PASSWORD,
    // database:process.env.DB_NAME,
    // autoLoadEntities:true,
    // synchronize:true
    // }),
    WeatherModule,
  ],
})
export class AppModule {}
