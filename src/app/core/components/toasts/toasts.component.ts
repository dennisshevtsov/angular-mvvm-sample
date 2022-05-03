import { Component, ComponentRef,
         OnDestroy, ViewChild,
         ViewContainerRef,
         ViewEncapsulation,        } from '@angular/core';

import { Subscription, } from 'rxjs';

import { ToastComponent, } from '../toast/toast.component';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: [
    './toasts.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ToastsComponent implements OnDestroy {
  private readonly subscription: Subscription;
  private readonly components  : ComponentRef<ToastComponent>[];

  @ViewChild(
    'container',
    {
      read: ViewContainerRef,
    },
  )
  private viewContainerRef!: ViewContainerRef;

  public constructor() {
    this.subscription = new Subscription();
    this.components = [];
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();

    this.components.forEach(component => component.instance.ngOnDestroy());
    this.viewContainerRef.clear();
  }

  public error(message: string): void {
    this.push().instance.error(message);
  }

  public info(message: string): void {
    this.push().instance.info(message);
  }

  private push(): ComponentRef<ToastComponent>{
    const component = this.viewContainerRef.createComponent(
      ToastComponent);

    this.subscription.add(component.instance.hidden.subscribe(
      () => {
        const index = this.components.indexOf(component);

        this.viewContainerRef.remove(index);
        this.components.splice(index, 1);
      }));

    this.components.push(component);

    return component;
  }
}
