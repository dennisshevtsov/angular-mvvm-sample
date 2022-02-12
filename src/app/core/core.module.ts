import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent, } from '.';

@NgModule({
  declarations: [
    ModalComponent,
    PageComponent,
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
