import { Directive, Input, Output, EventEmitter, SimpleChange, ContentChildren, QueryList } from '@angular/core';
import { PaCellColor } from './cellColor2.directive';
@Directive({
  selector: "table"
})
export class PaCellColorSwitcher {
  @Input("paCellDarkColor")
  modelProperty: Boolean;

  @ContentChildren(PaCellColor)
  contentChildren: QueryList<PaCellColor>;

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    this.updateContentChildren(changes["modelProperty"].currentValue);
  }

  private updateContentChildren(dark: Boolean) {
    if (this.contentChildren != null && dark != undefined) {
      this.contentChildren.forEach((child, index) => {
        child.setColor(index % 2 ? dark : !dark);
      });
    }
  }

  ngAfterContentInit() {
    this.contentChildren.changes.subscribe(() => {
      setTimeout(() => this.updateContentChildren(this.modelProperty), 0);
    });
  }

}
