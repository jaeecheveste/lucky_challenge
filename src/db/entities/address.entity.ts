import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('address')
export class AddressEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', length: 60, unique: true })
    street: string;

    @Column({ type: 'integer', name: 'city_id' })
    cityID: number;
}