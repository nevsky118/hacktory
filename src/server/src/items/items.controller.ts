import { Controller, Get, Param, Query } from '@nestjs/common';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import Item from './entities/item.entity';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get()
  async findAll(@Query() paginationQuery: PaginationQueryDto): Promise<any> {
    return await this.itemsService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Item> {
    const idAsNumber = parseInt(id, 10);

    if (!isNaN(idAsNumber)) {
      return await this.itemsService.findOneById(idAsNumber);
    } else {
      return await this.itemsService.findOneByTitle(id);
    }
  }
}
