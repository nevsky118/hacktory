import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'coupons' })
class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column()
  discount: number;
}

export default Coupon;
