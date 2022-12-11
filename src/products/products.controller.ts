import { UpdateProduct } from './dto/update.product.dto';
import { CreateProduct } from './dto/create.product.dto';
import { ProductsService } from './products.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
    constructor (private readonly productsService: ProductsService){}

    @Get('/getall')
    async getAll(){
        return await this.productsService.getProducts()
    }


    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            product_image: {
            type: 'string',
            format: 'binary',
          },
          product_name: { type: 'string' },
          price: { type: 'number' }
        },
      },
    })
    @UseInterceptors(FileInterceptor('product_image'))
    @Post('/add')
    async postOne(@Body() body, @UploadedFile() file){
        const product = new CreateProduct()
        if(!file) file = {}
        product.product_image = file.path
        product.product_name = body.product_name
        product.price = +body.price
        if(!product.price || !product.product_name) throw new BadRequestException('Price and product name cannot be empty')
        return await this.productsService.addProduct(product)
    }

    @Delete('/delete/:id')
    async deleteOne(@Param('id') id: string){
        return this.productsService.deleteProduct(+id)
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
            product_image: {
                nullable: true,
                type: 'string',
                format: 'binary',
          },
          product_name: { type: 'string' },
          price: { type: 'number' }
        },
      },
    })
    @UseInterceptors(FileInterceptor('product_image'))
    @UsePipes(new ValidationPipe())
    @Put('/put/:id')
    async putOne(@Param('id') id: string, @Body() body, @UploadedFile() file){
        const product = new UpdateProduct()
        if(!file) file = {}
        product.product_image = file.path
        product.product_name = body.product_name
        product.price = body.price
        console.log(product);
        
        return await this.productsService.editProduct(+id ,product)
    }

}
