import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent,
         TimeComponent, ToastComponent,
         ToastsComponent,               } from '.';

@NgModule({
  declarations: [
    ModalComponent,
    PageComponent,
    TimeComponent,
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
    TimeComponent,
    ToastComponent,
    ToastsComponent,
  ],
})
export class CoreModule { }
