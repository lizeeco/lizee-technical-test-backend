import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('product')
export class Product {
  constructor(init?: Partial<Product>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  stock: number;

  @ManyToMany(() => Order, (order) => order.products)
  orders: Order[];
}
