import { BasketEntity } from "src/basket/entities/basket.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity{
    @PrimaryGeneratedColumn()
    id: number
    
    @Column({unique: true})
    username: string;
    
    @Column()
    password: string;

    @OneToMany(type => BasketEntity, basket => basket.user)
    basket: BasketEntity[]
}