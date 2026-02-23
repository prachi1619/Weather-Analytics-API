import { Entity , PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class CityWeather {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    city:string;

    @Column('float')
    temperature:number;

    @Column('float')
    minTemp:number;

    @Column('float')
    maxTemp:number;

    @CreateDateColumn()
    createdAt:Date;

}
