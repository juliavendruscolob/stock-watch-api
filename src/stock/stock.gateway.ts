import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Product } from '@prisma/client';
import { Server } from 'socket.io';

@WebSocketGateway()
export class StockGateway {
  @WebSocketServer()
  server: Server;

  notifyStockChange(product: Product) {
    this.server.emit('stockUpdate', {
      id: product.id,
      name: product.id,
      quantity: product.quantity,
      price: product.price
    })
  }
}
