import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WeatherService } from "./weather.service";
import { CitiesDto } from "./dto/cities.dto";
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@ApiTags('weather-analytics')
@Controller('analytics')
export class WeatherController{
    constructor(private readonly weatherService:WeatherService){}

    @Post('cities')
    @ApiOperation({ summary: 'Get weather analytics for multiple cities' })
    @ApiResponse({ status: 200, description: 'Weather analytics data for specified cities' })
    async getCitiesAnalytics(@Body() dto:CitiesDto){
        return this.weatherService.getAggregatedData(dto.cities)
    }

    @Get('city/:name')
    @ApiOperation({ summary: 'Get weather analytics for a specific city' })
    @ApiParam({ name: 'name', description: 'City name', type: 'string' })
    @ApiResponse({ status: 200, description: 'Weather analytics data for the specified city' })
    async getCity(@Param('name') name:string){
        return this.weatherService.getCityAnalytics(name)
    }
}