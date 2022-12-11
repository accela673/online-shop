import { ProductsEntity } from './entities/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MulterModule } from '@nestjs/platform-express/multer';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity]),
  MulterModule.registerAsync({
    useFactory: () => ({
      dest: './uploads',
    }),
  })],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
