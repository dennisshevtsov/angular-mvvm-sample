import { CommonModule } from '@angular/common';
import { NgModule     } from '@angular/core';
import { FormsModule  } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DateComponent   } from '.';
import { ModalComponent  } from '.';
import { PageComponent   } from '.';
import { TimeComponent   } from '.';
import { ToastComponent  } from '.';
import { ToastsComponent } from '.';

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
