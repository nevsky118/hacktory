import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Coupon from './entities/coupon.entity';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private couponsRepository: Repository<Coupon>,
  ) {}

  async findOneByValue(value: string): Promise<any> {
    // SQL INJECTION
    const query = `SELECT * FROM coupons WHERE value = '${value}'`;

    const coupons = await this.couponsRepository.query(query);

    if (!coupons.length) {
      throw new NotFoundException();
    }

    return coupons[0];
  }
}
