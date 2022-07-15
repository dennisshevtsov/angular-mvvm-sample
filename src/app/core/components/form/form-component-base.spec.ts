import { AbstractControl, FormGroup, } from '@angular/forms';

import { FormComponentBase,          } from './form-component-base';

class TestFormComponent extends FormComponentBase {
  private formSpyValue        : undefined | jasmine.SpyObj<FormGroup>;
  private controlSpyValue     : undefined | jasmine.SpyObj<AbstractControl>;
  private controlsPropSpyValue: undefined | jasmine.Spy<() => { [key: string]: jasmine.SpyObj<AbstractControl> }>;

  public get formSpy(): jasmine.SpyObj<FormGroup> {
    return this.formSpyValue!;
  }

  public get controlSpy(): jasmine.SpyObj<AbstractControl> {
    return this.controlSpyValue!;
  }

  public get controlsPropSpy(): jasmine.Spy<() => { [key: string]: AbstractControl }> {
    return this.controlsPropSpyValue!;
  }

  protected buildForm(): FormGroup {
    this.formSpyValue = jasmine.createSpyObj('FormGroup', ['get'], ['controls']);

    const formSpyDescs = Object.getOwnPropertyDescriptors(this.formSpy);

    this.controlSpyValue = jasmine.createSpyObj(
      'AbstractControl',
      ['markAsTouched', 'updateValueAndValidity'],
      ['pristine', 'touched', 'dirty']);

    this.formSpy.get.and.returnValue(this.controlSpy);

    this.controlsPropSpyValue = formSpyDescs.controls.get! as jasmine.Spy<() => { [key: string]: AbstractControl }>;
    this.controlsPropSpy.and.returnValue({
      'testControl': this.controlSpy,
    });

    return this.formSpy;
  }
}

describe('FormComponentBase', () => {
  it('validateForm should validate controls', () => {
    const component = new TestFormComponent();

    component.validateForm();

    expect(component.controlsPropSpy.calls.count())
      .withContext('form.controls should be called')
      .toBe(1);

    expect(component.formSpy.get.calls.count())
      .withContext('form.get should be called')
      .toBe(1);

    expect(component.controlSpy.markAsTouched.calls.count())
      .withContext('control.markAsTouched should be called')
      .toBe(1);

    expect(component.controlSpy.markAsTouched.calls.first().args[0])
      .withContext('control.markAsTouched should be called with correct param')
      .toEqual({
        onlySelf: true,
      });

    expect(component.controlSpy.updateValueAndValidity.calls.count())
      .withContext('control.updateValueAndValidity should be called')
      .toBe(1);
  });

  it('isValid return valid state of control', () => {
    const component = new TestFormComponent();
    component.form;

    const controlSpyDescs = Object.getOwnPropertyDescriptors(component.controlSpy);

    const pristinePropSpy = controlSpyDescs.pristine.get as jasmine.Spy<() => boolean>;
    const touchedPropSpy = controlSpyDescs.touched.get as jasmine.Spy<() => boolean>;
    const dirtyPropSpy = controlSpyDescs.dirty.get as jasmine.Spy<() => boolean>;

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(false);

    expect(component.isValid('test'))
      .withContext('control with pristin value should be valid')
      .toBe(true);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(1);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should be called')
      .toBe(1);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
  })
});
