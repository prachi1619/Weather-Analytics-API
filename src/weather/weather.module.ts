import { HttpModule } from "@nestjs/axios";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CityWeather } from "./entities/city-weather.entity";
import { WeatherController } from "./weather.controller";
import { WeatherService } from "./weather.service";
import { Module } from "@nestjs/common";


@Module({
    imports:[
        HttpModule,
        TypeOrmModule.forFeature([CityWeather])
    ],
    controllers:[WeatherController],
    providers:[WeatherService]
})

export class WeatherModule {}