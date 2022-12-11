import { BasketService } from './basket.service';
import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';

@ApiTags("Basket")
@Controller('basket')
export class BasketController {
    constructor (private readonly basketService: BasketService){}

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to get all products from your basket"})
    @Get()
    async getAllBusket(@Req() req){
        return await this.basketService.findAll(req.user.userId)        
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to add products to your basket"})
    @Post('post/:id/:count')
    async postToBusket(@Param('id') product_id: string, @Param('count') count: string , @Req() req){
        console.log(req.user);
        
        return await this.basketService.addOne(req.user.userId, +product_id, +count)
    }

    @ApiBearerAuth()
    @ApiUnauthorizedResponse()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({description: "This endpoint to delete product from your basket"})
    @Delete('/delete/:id')
    async deleteFromBusket(@Param('id') id: string){
        return await this.basketService.deleteOne(+id)
    }
}
