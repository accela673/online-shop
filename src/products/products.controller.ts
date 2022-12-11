import { UpdateProduct } from './dto/update.product.dto';
import { CreateProduct } from './dto/create.product.dto';
import { ProductsService } from './products.service';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';


@ApiTags("Products")
@Controller('products')
export class ProductsController {
    constructor (private readonly productsService: ProductsService){}

    @ApiOperation({description: "This endpoint to get one product from shop"})
    @Get('/get/:id')
    async getOne(@Param('id') id: string){
      return await this.productsService.getProduct(+id)
    }


    @ApiOperation({description: "This endpoint to get all products from shop"})
    @Get('/getall')
    async getAll(){
        return await this.productsService.getProducts()
    }

    @ApiOperation({description: "This endpoint to adding product to shop"})
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
        if(!product.price || !product.product_name.length) throw new BadRequestException('Price and product name cannot be empty')
        return await this.productsService.addProduct(product)
    }

    @ApiOperation({description: "This endpoint to deleting product from shop"})
    @Delete('/delete/:id')
    async deleteOne(@Param('id') id: string){
        return this.productsService.deleteProduct(+id)
    }

    @ApiOperation({description: "This endpoint to editing product in shop"})
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
        if(!product.price || !product.product_name.length) throw new BadRequestException('Price and product name cannot be empty')  
        return await this.productsService.editProduct(+id ,product)
    }

}
