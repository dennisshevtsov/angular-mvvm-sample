import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent, ToastComponent, } from '.';

@NgModule({
  declarations: [
    ModalComponent,
    PageComponent,
    ToastComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    ModalComponent,
    PageComponent,
  ],
})
export class CoreModule { }
