import { ViewContainerRef, } from '@angular/core';
import { inject, TestBed,  } from '@angular/core/testing';
import { By,               } from '@angular/platform-browser';

import { Subscription,     } from 'rxjs';

import { ToastsComponent,  } from './toasts.component';

describe('ToastsComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToastsComponent],
    });

    TestBed.overrideProvider(
      Subscription,
      { useValue: jasmine.createSpyObj(Subscription, ['add', 'unsubscribe'])});
  });

  it('ngOnDestroy should clean resources', inject([Subscription], (subscription: jasmine.SpyObj<Subscription>) => {
    const component = TestBed.createComponent(ToastsComponent);
    component.detectChanges();

    const container = (component.componentInstance as any).viewContainerRef;
    const clearSpy = spyOn(container, 'clear');

    component.componentInstance.ngOnDestroy();

    expect(subscription.unsubscribe.calls.count())
      .withContext('subscription.unsubscribe should be called')
      .toBe(1);

    expect(clearSpy.calls.count())
      .withContext('container.clear should be called')
      .toBe(1);
  }));
});
