import { inject, TestBed, } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { ToastComponent,  } from './toast.component';

declare var bootstrap: any;

const TOAST_TOKEN = 'toast';
const TOAST_INST_TOKEN = 'toastinst';

describe('ToastComponent', () => {
  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj(TOAST_TOKEN, ['getOrCreateInstance'], []);
    bootstrap.Toast = toastSpy;

    const toastInstanceSpy = jasmine.createSpyObj(TOAST_INST_TOKEN, ['show','dispose'], []);
    toastSpy.getOrCreateInstance.and.returnValue(toastInstanceSpy)

    TestBed.configureTestingModule({
      declarations: [ToastComponent],
      providers: [
        {
          provide : TOAST_TOKEN,
          useValue: toastSpy,
        },
        {
          provide : TOAST_INST_TOKEN,
          useValue: toastInstanceSpy,
        },
      ],
    });

    TestBed.overrideProvider(
      Subscription,
      {
        useValue: jasmine.createSpyObj(
          Subscription, ['add', 'unsubscribe']),
      });
  });

  it('ngAfterViewInit should initialize toast', inject(
    [
      Subscription,
      TOAST_TOKEN,
      TOAST_INST_TOKEN,
    ],
    (
      subscriptionSpy: jasmine.SpyObj<Subscription>,
      toastSpy: jasmine.SpyObj<any>,
      toastInstanceSpy: jasmine.SpyObj<any>,
    ) => {
      const component = TestBed.createComponent(ToastComponent);
      component.detectChanges();

      expect(toastSpy.getOrCreateInstance.calls.count())
        .withContext('toast should be created')
        .toBe(1);

      expect(toastSpy.getOrCreateInstance.calls.first().args[1])
        .withContext('default options should be taken')
        .toEqual({
          animation: true,
          autohide : true,
          delay    : 10000,
        });

      expect(toastInstanceSpy.show.calls.count())
        .withContext('show should be created')
        .toBe(1);

      expect(subscriptionSpy.add.calls.count())
        .withContext('subscription add should be called')
        .toBe(1);
  }));

  it('ngOnDestroy should dispose resources', inject(
    [
      Subscription,
      TOAST_INST_TOKEN,
    ],
    (
      subscriptionSpy: jasmine.SpyObj<Subscription>,
      toastInstanceSpy: jasmine.SpyObj<any>,
    ) => {
      const component = TestBed.createComponent(ToastComponent);
      component.detectChanges();
      component.componentInstance.ngOnDestroy();

      expect(subscriptionSpy.unsubscribe.calls.count())
      .withContext('unsubscribe should be called')
      .toBe(1);

      expect(toastInstanceSpy.dispose.calls.count())
        .withContext('dispose should be created')
        .toBe(1);
  }));
});
