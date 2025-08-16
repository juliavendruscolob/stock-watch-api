import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from '../dto/product.dto';
import { StockHistoryService } from 'src/stock-history/services/stock-history.service';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private readonly stockHistoryService: StockHistoryService,
  ) {}

  async createProduct(product: ProductDto) {
    const saveProduct = await this.prisma.product.create({
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    });

    return saveProduct;
  }

  async returnAllProducts() {
    const productsExists = await this.prisma.product.findFirst({
      where: {},
    });

    if (!productsExists) {
      throw new HttpException(
        'Does not have any product in database.',
        HttpStatus.NO_CONTENT,
      );
    }

    return await this.prisma.product.findMany();
  }

  async returnOneProduct(id: string) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new HttpException(
        'This product does not exists.',
        HttpStatus.CONFLICT,
      );
    }

    return productExists;
  }

  async updateProduct(id: string, product: ProductDto) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new HttpException(
        'This product does not exists.',
        HttpStatus.CONFLICT,
      );
    }

    const updatedProduct = await this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    });

    if (product.quantity !== productExists.quantity) {
      await this.stockHistoryService.registerMoviment(productExists, updatedProduct);
    }

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    const productExists = await this.prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new HttpException('This product does not exists', HttpStatus.CONFLICT);
    }

    await this.prisma.product.delete({
      where: {
        id,
      },
    });

    return { 
      message: 'Produto deletado com sucesso.'
     };
  }
}
