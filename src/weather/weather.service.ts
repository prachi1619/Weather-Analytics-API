import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { InjectRepository } from "@nestjs/typeorm";
import { CityWeather } from "./entities/city-weather.entity";
import { Repository } from "typeorm";


@Injectable()
export class WeatherService {
    constructor(
        private readonly httpService: HttpService,
        // @InjectRepository(CityWeather)
        // private readonly cityRepo: Repository<CityWeather>,
    ){}

    private API_KEY = process.env.WEATHER_API_KEY;

    async fetchCityWeather(city:string){
        try {
            const response = await firstValueFrom(
                this.httpService.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.API_KEY}&units=metric`)
            );
            const data = response.data;
        //     const weather = this.cityRepo.create({
        //         city,
        //         temperature:data.main.temp,
        //         minTemp: data.main.temp_min,
        //         maxTemp:data.main.temp_max
        // });

        // await this.cityRepo.save(weather);
        return data;
        }catch(error){
            throw new HttpException(
                `Failed tp fetch weather for ${city}`,
                HttpStatus.BAD_REQUEST
            )
        }
    }

    async getAggregatedData(cities:string[]){
        const results:CityWeather[]=[];
        for(const city of cities){
            const data = await this.fetchCityWeather(city);
            results.push(data);
        }

        const temps = results.map((r)=>r.temperature);

        const average = temps.reduce((sum,t)=>sum+t,0)

        const highest = results.reduce((prev,curr)=>
        curr.temperature>prev.temperature ? curr:prev)

        const lowest = results.reduce((prev,curr)=>
        curr.temperature<prev.temperature ? curr:prev)

        const horCities = results
        .filter((r)=>r.temperature>35)
        .map((r)=> r.city)

        return {
            averageTemperature:Number(average.toFixed(2)),
            highestTemperature:{
                city: highest.city,
                temp:highest.temperature
            },
            lowestTemperature:{
                city:lowest.city,
                temp:lowest.temperature
            },
            horCities
        }

    }
    async getCityAnalytics(city:string){
        const weather = await this.fetchCityWeather(city);
        const warning = 
        weather.temperature>35 
        ? 'Temperature exceeds 35 degree calcius' 
        : null;

        return {
            city:weather.city,
            currentTemperature:weather.temperature,
            minTemperature:weather.minTemp,
            maxTemperature:weather.maxTemp,
            warning
        }
    }
}