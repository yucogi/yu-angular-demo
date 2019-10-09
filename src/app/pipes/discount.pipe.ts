import { Pipe, Injectable } from '@angular/core';
import { DiscountService } from '../service/discount.service';
@Pipe({
  name: "discount",
  pure: false
})
export class PaDiscountPipe {
  constructor(private discount: DiscountService) { }
  transform(price: number): number {
    return this.discount.applyDiscount(price);
  }
}
