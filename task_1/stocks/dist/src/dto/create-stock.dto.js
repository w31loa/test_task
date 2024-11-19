var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber } from 'class-validator';
export class CreateStockDto {
    quantity_on_shelf;
    quantity_in_order;
    product_id;
    shop_id;
}
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "quantity_on_shelf", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "quantity_in_order", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "product_id", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], CreateStockDto.prototype, "shop_id", void 0);
