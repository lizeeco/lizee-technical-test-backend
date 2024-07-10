import { User } from '../src/entities/user.entity';
import { dataSource, TypeOrmConfigService } from '../config/dataSource';
import { Product } from '../src/entities/product.entity';
import { Order } from '../src/entities/order.entity';

export const USERS = [
  {
    firstname: 'John',
    lastname: 'Doe',
    email: 'johndoe@gmail.com',
  },
  {
    firstname: 'Jane',
    lastname: 'Doe',
    email: 'janedoe@gmail.com',
  },
].map((user) => {
  return new User({
    ...user,
  });
});

export const PRODUCTS = [
  {
    code: 'DRESS',
    name: 'Dress',
    stock: 49,
  },
  {
    code: 'TSHIRT',
    name: 'T-Shirt',
    stock: 50,
  },
].map((product) => {
  return new Product({
    ...product,
  });
});

export const ORDERS = [
  {
    user: USERS[0],
    products: [PRODUCTS[0]],
  },
].map((order) => {
  return new Order({
    ...order,
  });
});

export const seedData = async () => {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }

  await TypeOrmConfigService.cleanDatabase();

  const userRepo = dataSource.getRepository(User);
  const productRepo = dataSource.getRepository(Product);
  const orderRepo = dataSource.getRepository(Order);
  await userRepo.save(USERS);
  await productRepo.save(PRODUCTS);
  await orderRepo.save(ORDERS);
};

if (require.main === module) {
  seedData().then(() => {
    console.log('Fixtures loaded');
  });
}
