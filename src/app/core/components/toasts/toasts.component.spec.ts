import { ComponentRef     } from '@angular/core';
import { EventEmitter     } from '@angular/core';
import { ViewContainerRef } from '@angular/core';

import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { Subscription } from 'rxjs';

import { ToastComponent  } from '../toast/toast.component';
import { ToastsComponent } from './toasts.component';

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

  it('error should call toast comp error', inject([Subscription], (subscription: jasmine.SpyObj<Subscription>) => {
    const component = TestBed.createComponent(ToastsComponent);
    component.detectChanges();

    const container = (component.componentInstance as any).viewContainerRef;
    const createComponentSpy = spyOn(container, 'createComponent');
    const removeSpy = spyOn(container, 'remove');

    const componentSpy = jasmine.createSpyObj([], ['changeDetectorRef', 'instance']);
    createComponentSpy.and.returnValue(componentSpy);

    const changeDetectorRefDesc = Object.getOwnPropertyDescriptor(componentSpy, 'changeDetectorRef');
    const changeDetectorRefProp = changeDetectorRefDesc?.get as jasmine.Spy<() => ViewContainerRef>;

    const changeDetectorRefSpy = jasmine.createSpyObj(['detach', 'detectChanges'], []);
    changeDetectorRefProp.and.returnValue(changeDetectorRefSpy);

    const instanceDesc = Object.getOwnPropertyDescriptor(componentSpy, 'instance');
    const instanceProp = instanceDesc?.get as jasmine.Spy<() => ComponentRef<ToastComponent>>;

    const instanceSpy = jasmine.createSpyObj(['error', 'info'], []);
    instanceSpy.hidden = new EventEmitter<void>();

    instanceProp.and.returnValue(instanceSpy);

    component.componentInstance.error('test');

    expect(createComponentSpy.calls.count())
      .withContext('viewContainerRef.createComponent should be called')
      .toBe(1);

    expect(changeDetectorRefSpy.detach.calls.count())
      .withContext('changeDetectorRef.detach should be called')
      .toBe(1);

    expect(instanceProp.calls.count())
      .withContext('component.instance should be called twice')
      .toBe(2);

    expect(subscription.add.calls.count())
      .withContext('subscription.add should be called')
      .toBe(1);

    expect(changeDetectorRefSpy.detectChanges.calls.count())
      .withContext('changeDetectorRef.detectChanges should be called')
      .toBe(1);

    expect(instanceSpy.error.calls.count())
      .withContext('instance.error should be called')
      .toBe(1);

    expect(instanceSpy.info.calls.count())
      .withContext('instance.info should not be called')
      .toBe(0);

    instanceSpy.hidden.emit();

    expect(removeSpy.calls.count())
      .withContext('viewContainerRef.remove should be called')
      .toBe(1);
  }));

  it('info should call toast comp info', inject([Subscription], (subscription: jasmine.SpyObj<Subscription>) => {
    const component = TestBed.createComponent(ToastsComponent);
    component.detectChanges();

    const container = (component.componentInstance as any).viewContainerRef;
    const createComponentSpy = spyOn(container, 'createComponent');
    const removeSpy = spyOn(container, 'remove');

    const componentSpy = jasmine.createSpyObj([], ['changeDetectorRef', 'instance']);
    createComponentSpy.and.returnValue(componentSpy);

    const changeDetectorRefDesc = Object.getOwnPropertyDescriptor(componentSpy, 'changeDetectorRef');
    const changeDetectorRefProp = changeDetectorRefDesc?.get as jasmine.Spy<() => ViewContainerRef>;

    const changeDetectorRefSpy = jasmine.createSpyObj(['detach', 'detectChanges'], []);
    changeDetectorRefProp.and.returnValue(changeDetectorRefSpy);

    const instanceDesc = Object.getOwnPropertyDescriptor(componentSpy, 'instance');
    const instanceProp = instanceDesc?.get as jasmine.Spy<() => ComponentRef<ToastComponent>>;

    const instanceSpy = jasmine.createSpyObj(['error', 'info'], []);
    instanceSpy.hidden = new EventEmitter<void>();

    instanceProp.and.returnValue(instanceSpy);

    component.componentInstance.info('test');

    expect(createComponentSpy.calls.count())
      .withContext('viewContainerRef.createComponent should be called')
      .toBe(1);

    expect(changeDetectorRefSpy.detach.calls.count())
      .withContext('changeDetectorRef.detach should be called')
      .toBe(1);

    expect(instanceProp.calls.count())
      .withContext('component.instance should be called twice')
      .toBe(2);

    expect(subscription.add.calls.count())
      .withContext('subscription.add should be called')
      .toBe(1);

    expect(changeDetectorRefSpy.detectChanges.calls.count())
      .withContext('changeDetectorRef.detectChanges should be called')
      .toBe(1);

    expect(instanceSpy.error.calls.count())
      .withContext('instance.error should not be called')
      .toBe(0);

    expect(instanceSpy.info.calls.count())
      .withContext('instance.info should be called')
      .toBe(1);

    instanceSpy.hidden.emit();

    expect(removeSpy.calls.count())
      .withContext('viewContainerRef.remove should be called')
      .toBe(1);
  }));
});
