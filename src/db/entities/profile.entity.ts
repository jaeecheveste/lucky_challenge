import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('profile')
export class ProfileEntity {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: 'integer', name: 'user_id' })
    userID: number;

    @Column({ type: 'integer', name: 'address_id' })
    addressID: number;

    @Column({ type: 'varchar', length: 60, unique: true })
    name: string;

    constructor(userID: number, addressID: number, name: string) {
        this.userID = userID;
        this.addressID = addressID;
        this.name = name;
    }
}