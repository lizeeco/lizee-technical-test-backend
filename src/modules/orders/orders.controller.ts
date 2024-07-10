import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { Order } from '../../entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async createOrder(@Body() orderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(orderDto);
  }
}
