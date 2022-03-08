import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { ErrorComponent, } from './components';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'todo',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
