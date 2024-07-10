import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Order } from '../../entities/order.entity';
import { User } from '../../entities/user.entity';
import { Product } from '../../entities/product.entity';
import { dataSource, TypeOrmConfigService } from '../../../config/dataSource';
import { CreateOrderDto } from './order.dto';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeAll(async () => {
    await dataSource.initialize();
  });

  beforeEach(async () => {
    await TypeOrmConfigService.cleanDatabase();
    await TypeOrmConfigService.seedDatabase();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [],
          inject: [ConfigModule],
          useClass: TypeOrmConfigService,
        }),
        TypeOrmModule.forFeature([Order, User, Product]),
      ],
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  describe('createOrder', () => {
    it('should create an order', async () => {
      const orderDto: CreateOrderDto = {
        email: 'lmartinez@lizee.co',
        firstname: 'Lucas',
        lastname: 'Martinez',
        products: [
          {
            code: 'TSHIRT',
          },
        ],
      };

      const order = await service.createOrder(orderDto);
      expect(order).toBeDefined();
    });
  });
});
