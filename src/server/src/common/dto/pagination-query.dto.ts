import { IsOptional, IsPositive, Length, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  page: number;

  @IsOptional()
  @Length(1, 32)
  q: string;
}
