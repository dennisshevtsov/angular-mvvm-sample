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
  @ViewChild(
    'container',
    {
      read: ViewContainerRef,
    },
  )
  private viewContainerRef!: ViewContainerRef;

  public push(title: string, message: string) {
    const component = this.viewContainerRef.createComponent(
      ToastComponent);

    component.instance.title = title;
    component.instance.message = message;
  }
}
