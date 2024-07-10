import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('order')
export class Order {
  constructor(init?: Partial<Order>) {
    Object.assign(this, init);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: new Date() })
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  @RelationId((order: Order) => order.user)
  userId: number;

  @ManyToMany(() => Product, (product) => product.orders, { cascade: true })
  @JoinTable({
    name: 'products_to_orders',
    joinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
