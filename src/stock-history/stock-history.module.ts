import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StockHistoryController } from './controllers/stock-history.controller';
import { StockHistoryService } from './services/stock-history.service';

@Module({
  controllers: [StockHistoryController],
  providers: [StockHistoryService, PrismaService],
})
export class StockHistoryModule {}
