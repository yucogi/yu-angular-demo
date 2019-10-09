import { Component, Output, EventEmitter, ViewEncapsulation } from "@angular/core";
import { Product } from '../product.model';
import { ProductFormGroup } from '../form.model';

//styles: ['div { background-color: lightgreen }'] styleUrls: ["../css/productForm.component.css"]
@Component({
  selector: 'paProductForm',
  templateUrl: '../templates/productForm.component.html',
  styleUrls: ["../css/productForm.component.css"],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductFormComponent {
  form: ProductFormGroup = new ProductFormGroup();
  newProduct: Product = new Product();
  formSubmitted: boolean = false;
  @Output("paNewProduct")
  newProductEvent = new EventEmitter<Product>();

  submitForm(form: any) {
    this.formSubmitted = true;
    if (form.valid) {
      this.newProductEvent.emit(this.newProduct);
      this.newProduct = new Product();
      this.form.reset();
      this.formSubmitted = false;
    }
  }
}
