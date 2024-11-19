var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, ValidateNested, IsString, } from 'class-validator';
class QuantityParamsDto {
    from;
    to;
}
__decorate([
    IsNumber(),
    Type(() => Number),
    __metadata("design:type", Number)
], QuantityParamsDto.prototype, "from", void 0);
__decorate([
    IsNumber(),
    Type(() => Number),
    __metadata("design:type", Number)
], QuantityParamsDto.prototype, "to", void 0);
export class FindAllStocksDto {
    plu;
    shop_id;
    quantity_on_shelf;
    quantity_on_order;
}
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], FindAllStocksDto.prototype, "plu", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsNumber(),
    __metadata("design:type", Number)
], FindAllStocksDto.prototype, "shop_id", void 0);
__decorate([
    IsOptional(),
    ValidateNested(),
    Type(() => QuantityParamsDto),
    __metadata("design:type", QuantityParamsDto)
], FindAllStocksDto.prototype, "quantity_on_shelf", void 0);
__decorate([
    ValidateNested(),
    Type(() => QuantityParamsDto),
    IsOptional(),
    __metadata("design:type", QuantityParamsDto)
], FindAllStocksDto.prototype, "quantity_on_order", void 0);
