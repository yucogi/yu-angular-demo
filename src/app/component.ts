import { ApplicationRef, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Model } from './repository.model';
import { Product} from './product.model';
import { ProductFormGroup } from "./form.model";

//styles: ["/deep/ div { border: 2px black solid; font-style:italic }"]
@Component({
  selector: "app",
  templateUrl: "templates/enteranceTemplate2.html"
})
export class ProductComponent {
  model: Model = new Model();
  form: ProductFormGroup = new ProductFormGroup();

  fontSizeWithUnits: string = "30px";
  fontSizeWithoutUnits: string= "30";
  //When Angular performs the bootstrapping process, it creates an ApplicationRef object to represent the application.
  //using the Angular dependency injection feature
  //exposing these objects allows them to be manipulated through the browser’s JavaScript console
  constructor(ref: ApplicationRef) {
    (<any> window).appRef = ref;
    (<any> window).model = this.model;
  }

  getProductByPosition(position: number): Product {
    return this.model.getProducts()[position];
  }
  getClassesByPosition(position: number): string {
    let product = this.getProductByPosition(position);
    return "p-2 " + (product.price < 50 ? "bg-info" : "bg-warning");
  }

  getClasses(): string {
    return this.model.getProducts().length == 5 ? "bg-success" : "bg-warning";
  }

  getClasses2(key: number): string {
    let product = this.model.getProduct(key);
    return "p-2 " + (product.price < 50 ? "bg-info" : "bg-warning");
  }

  getClassMap(key: number): Object {
    //Each property on the object is the name of one or more classes, separated by spaces. The host element will be added to the class if the value of the property is truthy.
    let product = this.model.getProduct(key);
    return {
      "text-center bg-danger": product.name == "Kayak",
      "bg-info": product.price < 50
    };
  }

  getStyles(key: number) {
    let product = this.model.getProduct(key);
    return {
      fontSize: "30px",
      "margin.px": 100,
      color: product.price <= 50 ? "red" : "green"
    };
  }

  getProduct(key: number): Product {
    return this.model.getProduct(key);
  }
  getProducts(): Product[] {
    return this.model.getProducts();
  }
  getProductCount(): number {
    console.log("getProductCount invoked");
    return this.getProducts().length;
  }
  targetName: string = "Kayak";
  //define a component method that will help Angular
  //determine when two different objects represent the same data
  getKey(index: number, product: Product) {
    return product.id;
  }
  counter: number = 1;

  getProductPrice(index: number): number {
    return Math.floor(this.getProduct(index).price);
  }

  selectedProduct: string;
  getSelected(product: Product): boolean {
    return product.name == this.selectedProduct;
  }

  newProduct: Product = new Product();
  get jsonProduct() {
    return JSON.stringify(this.newProduct);
  }
  addProduct(p: Product) {
    //console.log("New Product: " + this.jsonProduct);
    this.model.saveProduct(p);
  }

  getValidationMessages(state: any, thingName?: string) {
    //state: The Validation Object
    //state.path: This property returns the name of the element.
    let thing: string = state.path || thingName;
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            messages.push(`You must enter a ${thing}`);
            break;
          case "minlength":
            messages.push(`A ${thing} must be at least ${state.errors['minlength'].requiredLength} characters`);
            break;
          case "pattern":
            messages.push(`The ${thing} contains illegal characters`);
            break;
        }
      }
    }
    return messages;
  }

  formSubmitted: boolean = false;
  submitForm(form: NgForm) {
    this.formSubmitted = true;
    if (form.valid) {
      this.addProduct(this.newProduct);
      this.newProduct = new Product();
      form.reset();
      this.formSubmitted = false;
    }
  }

  getFormValidationMessages(form: NgForm): string[] {
    let messages: string[] = [];
    //Object.keys(obj) obj:要返回其枚举自身属性的对象。
    //The Object.keys method creates an array from the properties defined by the object returned by the
    //controls property, which is enumerated using the forEach method.
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k)
        .forEach(m => messages.push(m));
    });
    return messages;
    }

   showTable: boolean = true;

  deleteProduct(key: number) {
    this.model.deleteProduct(key);
  }
}
