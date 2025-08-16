import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { PrismaService } from 'src/prisma.service';
import { StockHistoryModule } from 'src/stock-history/stock-history.module';

@Module({
  imports: [StockHistoryModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService],
})
export class ProductModule {}
