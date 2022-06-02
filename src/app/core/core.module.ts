import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, } from '@angular/router';

import { DateComponent, ModalComponent,
         PageComponent, TimeComponent,
         ToastComponent, ToastsComponent, } from '.';

@NgModule({
  declarations: [
    DateComponent,
    ModalComponent,
    PageComponent,
    TimeComponent,
    ToastComponent,
    ToastsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    DateComponent,
    ModalComponent,
    PageComponent,
    TimeComponent,
    ToastComponent,
    ToastsComponent,
  ],
})
export class CoreModule { }
