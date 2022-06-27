import { Injectable, } from '@angular/core';

declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class RouteCleaner {
  public clean(): void {
    const href: string = window.location.href;
    const hashIndex = href.indexOf('#');
    const cleanHref = href.substring(0, hashIndex);

    const title: string = window.document.title;

    window.history.pushState('', title, cleanHref);
  }
}
