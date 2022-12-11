import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ProductsEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    product_image: string;

    @Column()
    product_name: string;

    @Column()
    price: number;
}