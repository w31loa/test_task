import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  plu: string;

  @IsString()
  name: string;
}
