/*
import { Directive, Input, Output, EventEmitter, SimpleChange, ContentChild } from '@angular/core';
import { PaCellColor } from './cellColor.directive';
@Directive({
  selector: "table"
})
export class PaCellColorSwitcher {
  @Input("paCellDarkColor")
  modelProperty: Boolean;

  @ContentChild(PaCellColor, {static: false})
  contentChild: PaCellColor;

  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    if (this.contentChild != null) {
      this.contentChild.setColor(changes["modelProperty"].currentValue);
    }
  }
}
*/
