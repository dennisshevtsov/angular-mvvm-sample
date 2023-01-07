import { Component         } from '@angular/core';
import { ComponentRef      } from '@angular/core';
import { OnDestroy         } from '@angular/core';
import { ViewChild         } from '@angular/core';
import { ViewContainerRef  } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: [
    './toasts.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: Subscription,
      useFactory: () => new Subscription(),
    },
  ],
})
export class ToastsComponent implements OnDestroy {
  private readonly components: ComponentRef<ToastComponent>[];

  @ViewChild(
    'container',
    {
      read: ViewContainerRef,
    },
  )
  private viewContainerRef!: ViewContainerRef;

  public constructor(
    private readonly subscription: Subscription
  ) {
    this.components = [];
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.viewContainerRef.clear();
  }

  public error(message: string): void {
    const component = this.push();

    component.instance.error(message);
    component.changeDetectorRef.detectChanges();
  }

  public info(message: string): void {
    const component = this.push();

    component.instance.info(message);
    component.changeDetectorRef.detectChanges();
  }

  private push(): ComponentRef<ToastComponent>{
    const component = this.viewContainerRef.createComponent(
      ToastComponent);

    component.changeDetectorRef.detach();

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
