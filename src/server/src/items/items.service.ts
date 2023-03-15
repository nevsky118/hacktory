import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Item from './entities/item.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Like } from 'typeorm';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemsRepository: Repository<Item>,
  ) {}

  async findAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<{ docs: Item[]; totalPages: number }> {
    const { page, q } = paginationQuery;

    const limit = 12;

    let offset: number | undefined;
    if (page !== undefined) {
      offset = (page - 1) * limit;
    }

    const query: any = {};
    if (offset !== undefined) {
      query.skip = offset;
      query.take = limit;
    }

    if (q) {
      query.where = { title: Like(`%${q.toUpperCase()}%`) };
    }

    const [items, total] = await this.itemsRepository.findAndCount(query);

    const totalPages = page !== undefined ? Math.ceil(total / limit) : 0;

    return { docs: items, totalPages };
  }

  async findOneById(id: number): Promise<Item> {
    const item = await this.itemsRepository.findOneBy({ id });

    if (!item) {
      throw new NotFoundException(`Item #${id} not found`);
    }

    return item;
  }

  async findOneByTitle(title: string): Promise<Item> {
    const parsedTitle = title.split('-').join(' ').toUpperCase();

    const item = await this.itemsRepository.findOneBy({ title: parsedTitle });

    if (!item) {
      throw new NotFoundException(`Item #${title} not found`);
    }

    return item;
  }
}
