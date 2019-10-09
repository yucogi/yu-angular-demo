import { Directive, ViewContainerRef, TemplateRef, Input, SimpleChange, IterableDiffer, IterableDiffers,
  ChangeDetectorRef, ViewRef } from '@angular/core';
@Directive({
  selector: "[paForOf]"
})
export class PaIteratorDirective {
  private differ: any;
  private views: Map<any, PaIteratorContext> = new Map<any, PaIteratorContext>();

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<Object>,
              private differs: IterableDiffers,
              private changeDetector: ChangeDetectorRef) {}
  @Input("paForOf")
  dataSource: any;
/*  ngOnInit() {
    this.container.clear();
    for (let i = 0; i < this.dataSource.length; i++) {
      // The TemplateRef provides the content to
      // insert into the container, and the context object provides the data for the implicit value, which is specified
      // using a property called $implicit. It is this object, with its $implicit property, that is assigned to the item
      // template variable and that is referred to in the string interpolation binding. To provide templates with the
      // context object in a type-safe way, I defined a class called PaIteratorContext, whose only property is called $implicit.
      this.container.createEmbeddedView(this.template,
        new PaIteratorContext(this.dataSource[i], i, this.dataSource.length));
    }
  }*/

  ngOnInit() {
    this.differ = this.differs.find(this.dataSource).create();
    //his.updateContent();
  }
  ngDoCheck() {
    // console.log("ngDoCheck Called");
    // this.updateContent();
    const changes = this.differ.diff(this.dataSource);
    if (changes != null) {
      console.log("ngDoCheck called, changes detected");
      changes.forEachAddedItem(addition => {
        // this.container.createEmbeddedView(this.template,
        //   new PaIteratorContext(addition.item, addition.currentIndex, changes.length));

        const context = new PaIteratorContext(addition.item, addition.currentIndex, changes.length);
        context.view = this.container.createEmbeddedView(this.template, context);
        this.views.set(addition.trackById, context);

      });

      let removals = false;
      changes.forEachRemovedItem(removal => {
        removals = true;
        const context = this.views.get(removal.trackById);
        if (context != null) {
          this.container.remove(this.container.indexOf(context.view));
          this.views.delete(removal.trackById);
        }
      });
      if (removals) {
        let index = 0;
        this.views.forEach(context =>
          context.setData(index++, this.views.size));
      }
    }
  }
  private updateContent() {
    this.container.clear();
    for (let i = 0; i < this.dataSource.length; i++) {
      this.container.createEmbeddedView(this.template,
        new PaIteratorContext(this.dataSource[i], i, this.dataSource.length));
    }
  }
}
class PaIteratorContext {
  index: number;
  odd: boolean; even: boolean;
  first: boolean; last: boolean;
  view: ViewRef;
  constructor(public $implicit: any,
              public position: number, total: number ) {
    this.setData(position, total);
    // setInterval(() => {
    //   this.odd = !this.odd; this.even = !this.even;
    //   this.$implicit.price++;
    // }, 2000);
  }
  setData(index: number, total: number) {
    this.index = index;
    this.odd = index % 2 == 1;
    this.even = !this.odd;
    this.first = index == 0;
    this.last = index == total - 1;
  }
}
