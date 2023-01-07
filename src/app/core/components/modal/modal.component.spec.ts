import { inject  } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

declare var bootstrap: any;

const MODAL_TOKEN = 'modal';

describe('ModalComponent', () => {
  beforeEach(() => {
    const modalSpy = jasmine.createSpyObj(MODAL_TOKEN, ['show', 'hide'], []);
    spyOn(bootstrap, 'Modal').and.returnValue(modalSpy);

    TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        {
          provide: MODAL_TOKEN,
          useValue: modalSpy,
        },
      ],
    });
  });

  it('show should call bootstrap.modal.show', inject([MODAL_TOKEN], (modalSpy: jasmine.SpyObj<any>) => {
    const component = TestBed.createComponent(ModalComponent);
    component.detectChanges();

    component.componentInstance.show();

    expect(modalSpy.show.calls.count())
      .withContext('modal.show should be called')
      .toBe(1);
  }));

  it('onOkClicked should hide modal and emit ok event', inject([MODAL_TOKEN], (modalSpy: jasmine.SpyObj<any>) => {
    const component = TestBed.createComponent(ModalComponent);
    component.detectChanges();

    const okSpy = spyOn(component.componentInstance.ok, 'emit');

    component.componentInstance.onOkClicked();

    expect(modalSpy.hide.calls.count())
      .withContext('modal.hide should be called')
      .toBe(1);

    expect(okSpy.calls.count())
      .withContext('ok.emit should be called')
      .toBe(1);
  }));

  it('onCancelClicked should hide modal and emit cancel event', inject([MODAL_TOKEN], (modalSpy: jasmine.SpyObj<any>) => {
    const component = TestBed.createComponent(ModalComponent);
    component.detectChanges();

    const cancelSpy = spyOn(component.componentInstance.cancel, 'emit');

    component.componentInstance.onCancelClicked();

    expect(modalSpy.hide.calls.count())
      .withContext('modal.hide should be called')
      .toBe(1);

    expect(cancelSpy.calls.count())
      .withContext('cancel.emit should be called')
      .toBe(1);
  }));
});
