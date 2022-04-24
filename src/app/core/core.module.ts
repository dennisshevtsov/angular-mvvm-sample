import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent, } from '.';
import { ToastComponent } from './components/toast/toast.component';

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
