import { ProductsEntity } from './../products/entities/products.entity';
import { BasketEntity } from 'src/basket/entities/basket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class BasketService {
    constructor(
        @InjectRepository(BasketEntity)
        private readonly basketRepo: Repository<BasketEntity>,
        @InjectRepository(ProductsEntity)
        private readonly productsRepo: Repository<ProductsEntity>
    ){}

    async findAll(userId: number){

        const user = await this.basketRepo.find({
            relations: ['user'],
            where: { user: {id: userId} },
          });
        for (let i = 0; i < user.length; i++){
            delete user[i].user.password
        }
        return user
        
    }

    async deleteOne(id: number){
        const order = await this.basketRepo.findOne({where:{id:id}})
        if(!order) throw new BadRequestException('There is no order with this id')       
        return await this.basketRepo.remove(order)
    }

    async addOne(userId: number, product_id: number, count: number ){
        const product = await this.productsRepo.findOne({where: {id: product_id}})
        if(!product) throw new BadRequestException('This product does not exists')
        const obj = {user:{}, product_id:0,product_name:'', count}
        obj.product_id = product_id
        obj.product_name = product.product_name
        obj.count = count
        obj.user = {id: userId}
        return await this.basketRepo.save(obj)
    }
}
