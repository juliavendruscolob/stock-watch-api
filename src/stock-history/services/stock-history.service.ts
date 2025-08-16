import { Injectable } from "@nestjs/common";
import { Product } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import { StockGateway } from "src/stock/stock.gateway";

@Injectable()
export class StockHistoryService {
    constructor(
        private prisma: PrismaService,
        private stockGateway: StockGateway,
    ) {}

    async registerMoviment(oldProduct: Product, newProduct: Product) {
        const history = await this.prisma.stockHistory.create({
        data: {
            productId: oldProduct.id,
            oldQuantity: oldProduct.quantity,
            newQuantity: newProduct.quantity
        },
    });

    this.stockGateway.notifyStockChange(newProduct);

    return history;
  }
}
