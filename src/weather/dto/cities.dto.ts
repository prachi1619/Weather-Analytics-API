import {IsArray,ArrayNotEmpty,IsString} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CitiesDto {
    @ApiProperty({ 
        description: 'Array of city names',
        type: [String],
        example: ['london', 'new york', 'tokyo']
    })
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each:true})
    cities:string[];
}