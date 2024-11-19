import { IsNumber } from 'class-validator';

export class CreateStockDto {
  @IsNumber()
  quantity_on_shelf: number;

  @IsNumber()
  quantity_in_order: number;

  @IsNumber()
  product_id: number;
  
  @IsNumber()
  shop_id: number;
}
