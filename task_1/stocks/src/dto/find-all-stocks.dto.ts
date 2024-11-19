import { Transform, Type } from 'class-transformer';
import {
  IsOptional,
  IsNumber,
  ValidateNested,
  IsString,
} from 'class-validator';

class QuantityParamsDto {
  @IsNumber()
  @Type(() => Number)
  from: number;

  @IsNumber()
  @Type(() => Number)
  to: number;
}

export class FindAllStocksDto {
  @IsOptional()
  @IsString()
  plu?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  shop_id?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => QuantityParamsDto)
  quantity_on_shelf?: QuantityParamsDto;

  @ValidateNested()
  @Type(() => QuantityParamsDto)
  @IsOptional()
  quantity_on_order?: QuantityParamsDto;
}
