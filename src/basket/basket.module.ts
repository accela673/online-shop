import { ProductsEntity } from './../products/entities/products.entity';
import { BasketEntity } from 'src/basket/entities/basket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  imports: [TypeOrmModule.forFeature([BasketEntity, ProductsEntity])],
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {}
