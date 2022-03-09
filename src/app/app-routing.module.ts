import { NgModule,             } from '@angular/core';
import { RouterModule, Routes, } from '@angular/router';

import { ErrorComponent,           } from './components';
import { ERROR_ROUTE_NEW_FRAGMENT, } from './core';

const routes: Routes = [
  {
    path: ERROR_ROUTE_NEW_FRAGMENT,
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
