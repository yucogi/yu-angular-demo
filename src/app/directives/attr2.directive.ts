import { Directive, ElementRef, Attribute, Input, SimpleChange, Output, EventEmitter, HostListener, HostBinding } from '@angular/core';
import { Product } from "./../product.model";
@Directive({
  selector: "[pa-attr]"
})
export class PaAttrDirective {
  element: ElementRef;
  constructor(element: ElementRef) {
    this.element = element;
    //comment out below codes because of @HostListener
    // this.element.nativeElement.addEventListener("click", e => {
    //   if (this.product != null) {
    //     this.click.emit(this.product.category);
    //   }
    // });
  }

  @HostListener("click")
  triggerCustomEvent() {
    if (this.product != null) {
      this.click.emit(this.product.category);
    }
  }

  @Input("pa-attr")
  @HostBinding("class")
  bgClass: string;

  @Input("pa-product")
  product: Product;
  //The EventEmitter class provides the event mechanism for Angular directives. The listing creates an
  // EventEmitter object and assigns it to a variable called click
  @Output("pa-category")
  click = new EventEmitter<string>();

  ngOnInit() {
    this.element.nativeElement.classList.add(this.bgClass || "bg-success", "text-white");
  }
  //The ngOnChanges parameter is an object whose property names refer to each changed input property and whose values are SimpleChange objects
  //comment out below codes because of @HostBinding("class")
  // ngOnChanges(changes: {[property: string]: SimpleChange }) {
  //   let change = changes["bgClass"];
  //   let classList = this.element.nativeElement.classList;
  //   //isFirstChange() method returns true if this is the call to the ngOnChanges method that occurs before the ngOnInit method.
  //   if (!change.isFirstChange() && classList.contains(change.previousValue)) {
  //     classList.remove(change.previousValue);
  //   }
  //   if (!classList.contains(change.currentValue)) {
  //     classList.add(change.currentValue);
  //   }
  // }
}
