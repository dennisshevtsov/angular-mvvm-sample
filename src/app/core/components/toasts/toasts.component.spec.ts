import { inject, TestBed, } from '@angular/core/testing';

import { Subscription,    } from 'rxjs';

import { ToastsComponent, } from './toasts.component';

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

    component.componentInstance.ngOnDestroy();

    expect(subscription.unsubscribe.calls.count())
      .withContext('subscription.unsubsribe should be called')
      .toBe(1);
  }));
});
