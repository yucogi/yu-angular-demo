import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { AppComponent } from './app.component';
import { ProductComponent } from './component';
import { PaAttrDirective } from './directives/attr2.directive';
import { PaModel } from './directives/twoway.directive';
import { PaStructureDirective } from './directives/structure.directive';
import { PaIteratorDirective } from './directives/iterator.directive';
import { PaCellColor } from './directives/cellColor2.directive';
import { PaCellColorSwitcher } from './directives/cellColorSwitcher2.directive';
import { ProductTableComponent } from './components/productTable.component';
import { ProductFormComponent } from './components/productForm2.component';
import { PaToggleView } from './components/toggleView.component';
import { PaDiscountDisplayComponent } from './components/discountDisplay.component';
import { PaDiscountEditorComponent } from './components/discountEditor.component';

import { PaAddTaxPipe } from './pipes/addTax.pipe';
import { PaCategoryFilterPipe } from './pipes/categoryFilter.pipe';
import { PaDiscountPipe } from './pipes/discount.pipe';

import { LOCALE_ID } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';

import { DiscountService } from './service/discount.service';

//registerLocaleData(localeFr);

@NgModule({
  declarations: [
    ProductComponent, ProductTableComponent, ProductFormComponent, PaToggleView, PaDiscountDisplayComponent, PaDiscountEditorComponent,
    PaAttrDirective, PaModel, PaStructureDirective, PaIteratorDirective, PaCellColor, PaCellColorSwitcher,
    PaAddTaxPipe, PaCategoryFilterPipe, PaDiscountPipe
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule
  ],
  providers: [DiscountService],
  bootstrap: [ProductComponent]
})
//providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }],
export class AppModule { }
