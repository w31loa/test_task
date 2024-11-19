import { IsNumber } from 'class-validator';

export class UpdateStockDto {
  @IsNumber()
  quantity_on_shelf: number;

  @IsNumber()
  quantity_in_order: number;
}
