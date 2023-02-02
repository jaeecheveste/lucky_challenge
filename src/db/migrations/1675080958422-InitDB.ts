import { MigrationInterface, QueryRunner } from "typeorm"

export class InitDB1675080958422 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "user" 
                (
                    id uuid DEFAULT gen_random_uuid() PRIMARY KEY, 
                    username VARCHAR ( 30 ) UNIQUE NOT NULL,
                    password VARCHAR ( 100 ) NOT NULL
                )`
        );

        await queryRunner.query(
            `CREATE TABLE "country" 
                ( 
                    id SERIAL PRIMARY KEY,
                    name VARCHAR ( 80 ) NOT NULL
                );`
        );

        await queryRunner.query(
            `CREATE TABLE "city" 
                ( 
                    id SERIAL PRIMARY KEY,
                    country_id integer not NULL,
                    name VARCHAR ( 80 ) NOT NULL,
                    constraint fk_city_country
                        foreign key (country_id) 
                        REFERENCES "country" (id)
                );`
        );

        await queryRunner.query(
            `CREATE TABLE "address" 
                ( 
                    id SERIAL PRIMARY KEY,
                    city_id integer not NULL,
                    street VARCHAR ( 200 ) NOT NULL,
                    constraint fk_city_country
                        foreign key (city_id) 
                        REFERENCES "city" (id)
                );`
        );

        await queryRunner.query(
            `CREATE TABLE "profile" 
                ( 
                    id SERIAL PRIMARY KEY,
                    user_id uuid NOT NULL,
                    address_id integer NOT NULL,
                    name VARCHAR( 100 ) NOT NULL,
                    constraint fk_profile_address
                        foreign key (address_id) 
                        REFERENCES address (id),
                    constraint fk_profile_user
                        foreign key (user_id) 
                        REFERENCES "user" (id)
                );`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
