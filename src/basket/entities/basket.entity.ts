import { UsersEntity } from './../../users/entities/users.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasketEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_id: number

    @Column()
    product_name: string

    @Column()
    count: number

    @ManyToOne(type => UsersEntity, user => user.basket)
    @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
    user: UsersEntity

}