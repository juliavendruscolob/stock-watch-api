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
    const productExists = await this.prisma.product.findFirst({
      where: {
        id: product.id,
      },
    });

    if (productExists) {
      throw new HttpException(
        'This product already exists in database.',
        HttpStatus.CONFLICT,
      );
    }

    const saveProduct = await this.prisma.product.create({
      data: {
        id: product.id,
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
      throw new HttpException('Does not have any product in database.', HttpStatus.NO_CONTENT);
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
      throw new HttpException('This product does not exist.', HttpStatus.CONFLICT);
    }
  }
}
