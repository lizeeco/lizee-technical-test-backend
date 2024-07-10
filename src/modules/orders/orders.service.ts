import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './order.dto';
import { Order } from '../../entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const {
      email,
      firstname,
      lastname,
      products: productsFromDto,
    } = createOrderDto;

    let user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      user = await this.userRepository.save(
        new User({
          email,
          firstname,
          lastname,
        }),
      );
    }

    const productCodes = productsFromDto.map((product) => product.code);
    const products = await this.productRepository.find({
      where: { code: In(productCodes) },
    });

    for (const product of products) {
      product.stock -= 1;
    }

    const orderToSave = new Order({
      date: new Date(),
      user,
      products,
    });

    try {
      return await this.orderRepository.save(orderToSave);
    } catch (e) {
      console.log('Error creating order: ', e);
    }
  }
}
