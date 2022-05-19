import { CommonModule, } from '@angular/common';
import { NgModule,     } from '@angular/core';
import { RouterModule, } from '@angular/router';

import { ModalComponent, PageComponent,
         ToastComponent, ToastsComponent, } from '.';
import { TimeComponent } from './components/time/time.component';

@NgModule({
  declarations: [
    ModalComponent,
    PageComponent,
    ToastComponent,
    ToastsComponent,
    TimeComponent,
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
