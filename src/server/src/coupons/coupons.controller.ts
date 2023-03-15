import { Controller, Get, Param } from '@nestjs/common';
import { CouponsService } from './coupons.service';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get(':value')
  async findOne(@Param('value') value: string): Promise<any> {
    return await this.couponsService.findOneByValue(value);
  }
}
