import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { StockHistoryModule } from './stock-history/stock-history.module';
import { StockGateway } from './stock/stock.gateway';

@Module({
  imports: [ProductModule, StockHistoryModule],
  controllers: [AppController],
  providers: [AppService, StockGateway],
})
export class AppModule {}
