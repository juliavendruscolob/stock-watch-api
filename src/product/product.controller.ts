import { Body, Controller, Delete, Get, HttpCode, Post, Put, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  createProduct(@Body() product: ProductDto) {
    return this.productService.createProduct(product);
  }

  @Get()
  @HttpCode(200)
  returnAllProducts() {
    return this.productService.returnAllProducts();
  }

  @Get(':id')
  @HttpCode(200)
  returnOneProduct(@Param('id') id: string) {
    return this.productService.returnOneProduct(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    return this.productService.updateProduct(id, product);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}

