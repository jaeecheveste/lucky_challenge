import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 30, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 100 })
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }
}