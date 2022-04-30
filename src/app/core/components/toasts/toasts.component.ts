import { Component, ViewChild, ViewContainerRef, } from '@angular/core';

import { ToastComponent, } from '../toast/toast.component';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: [
    './toasts.component.scss',
  ],
})
export class ToastsComponent {
  public constructor(
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  public push(title: string, message: string) {
    const component = this.viewContainerRef.createComponent(ToastComponent);

    component.instance.title = title;
    component.instance.message = message;
  }
}
