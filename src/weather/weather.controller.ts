import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { CitiesDto } from "./dto/cities.dto";


@Controller('analytics')
export class WeatherController{
    constructor(private readonly weatherService:WeatherService){}

    @Post('cities')
    async getCitiesAnalytics(@Body() dto:CitiesDto){
        return this.weatherService.getAggregatedData(dto.cities)
    }

    @Get('city/:name')
    async getCity(@Param('name') name:string){
        return this.weatherService.getCityAnalytics(name)
    }
}