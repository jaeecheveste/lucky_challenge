import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('country')
export class CountryEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 60, unique: true })
    name: string;
}