import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

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

    return this.prisma.product.update({
      where: {
        id,
      },
      data: {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    });
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

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
