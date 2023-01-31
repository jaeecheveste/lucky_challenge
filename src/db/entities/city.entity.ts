import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('city')
export class CityEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 60, unique: true })
    name: string;

    @Column({ type: 'integer', name: 'country_id' })
    countryID: number;

}