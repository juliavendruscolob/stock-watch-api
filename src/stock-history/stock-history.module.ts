import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StockHistoryService } from './services/stock-history.service';
import { StockGateway } from 'src/stock/stock.gateway';

@Module({
  providers: [StockHistoryService, PrismaService, StockGateway],
  exports: [StockHistoryService],
})
export class StockHistoryModule {}
