import { UpdateProduct } from './dto/update.product.dto';
import { CreateProduct } from './dto/create.product.dto';
import { ProductsEntity } from './entities/products.entity';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductsEntity)
        private readonly productsRepo: Repository<ProductsEntity>
    ){}

    async getProduct(id: number){
        return await this.productsRepo.findOne({where:{id:id}})
    }


    async getProducts(){
        return await this.productsRepo.find()
    }

    async addProduct(productDto: CreateProduct){
        const product = await this.productsRepo.findOne({where: {product_name: productDto.product_name}})
        if(product) throw new BadRequestException('Product with this name already exists')
        return await this.productsRepo.save(productDto)
    }

    async deleteProduct(id: number){
        const product = await this.productsRepo.findOne({where: {id: id}})
        if(!product) throw new BadRequestException("Product with this id doesn't exists")
        return await this.productsRepo.remove(product)
    }

    async editProduct(id: number, productDto: UpdateProduct){
        const product = await this.productsRepo.findOne({where: {id: id}})
        if(!product) throw new BadRequestException("Product with this id doesn't exists")
        if(!product.product_image) delete product.product_image
        Object.assign(product, productDto)
        return await this.productsRepo.save(product)
    }
}
