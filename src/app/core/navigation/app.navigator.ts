import { Injectable, } from '@angular/core';
import { Router,     } from '@angular/router';

import { ERROR_ROUTE_NEW_FRAGMENT, } from './app.routing';

@Injectable({
  providedIn: 'root',
})
export class AppNavigator {
  public constructor(
    private readonly router: Router,
  ) { }

  public navigateToError(): void {
    const link = [ ERROR_ROUTE_NEW_FRAGMENT, ];

    this.router.navigate(link);
  }
}
