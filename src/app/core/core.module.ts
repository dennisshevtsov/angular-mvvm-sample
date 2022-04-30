import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent,
         ToastComponent, ToastsComponent, } from '.';

@NgModule({
  declarations: [
    ModalComponent,
    PageComponent,
    ToastComponent,
    ToastsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ModalComponent,
    PageComponent,
    ToastComponent,
    ToastsComponent,
  ],
})
export class CoreModule { }
