import { AbstractControl, FormGroup, ValidationErrors, } from '@angular/forms';

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
      ['markAsTouched', 'updateValueAndValidity', 'hasError'],
      ['pristine', 'touched', 'dirty', 'valid', 'errors']);

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
    const validPropSpy = controlSpyDescs.valid.get as jasmine.Spy<() => boolean>;

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(false);
    validPropSpy.and.returnValue(false);

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

    expect(validPropSpy.calls.count())
      .withContext('control.valid should not be called')
      .toBe(0);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
    validPropSpy.calls.reset();

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(true);
    dirtyPropSpy.and.returnValue(false);
    validPropSpy.and.returnValue(false);

    expect(component.isValid('test'))
      .withContext('control with pristin and touched value should be invalid')
      .toBe(false);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(1);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should not be called')
      .toBe(0);

    expect(validPropSpy.calls.count())
      .withContext('control.valid should be called')
      .toBe(1);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
    validPropSpy.calls.reset();

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(true);
    validPropSpy.and.returnValue(false);

    expect(component.isValid('test'))
      .withContext('control with pristin and dirty value should be invalid')
      .toBe(false);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(1);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should be called')
      .toBe(1);

    expect(validPropSpy.calls.count())
      .withContext('control.valid should be called')
      .toBe(1);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
    validPropSpy.calls.reset();

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(true);
    validPropSpy.and.returnValue(true);

    expect(component.isValid('test'))
      .withContext('control with pristin and dirty value should be valid')
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

    expect(validPropSpy.calls.count())
      .withContext('control.valid should be called')
      .toBe(1);
  });

  it('hasErrors return valid state of control', () => {
    const component = new TestFormComponent();
    component.form;

    const controlSpyDescs = Object.getOwnPropertyDescriptors(component.controlSpy);

    const pristinePropSpy = controlSpyDescs.pristine.get as jasmine.Spy<() => boolean>;
    const touchedPropSpy = controlSpyDescs.touched.get as jasmine.Spy<() => boolean>;
    const dirtyPropSpy = controlSpyDescs.dirty.get as jasmine.Spy<() => boolean>;
    const errorsPropSpy = controlSpyDescs.errors.get as jasmine.Spy<() => ValidationErrors | null>;

    pristinePropSpy.and.returnValue(true);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(false);
    errorsPropSpy.and.returnValue({'test': true});

    expect(component.hasErrors('test'))
      .withContext('control with pristin value should not check errors')
      .toBe(false);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should not be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(1);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should be called')
      .toBe(1);

    expect(errorsPropSpy.calls.count())
      .withContext('control.erorrs should note be called')
      .toBe(0);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
    errorsPropSpy.calls.reset();

    pristinePropSpy.and.returnValue(false);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(false);
    errorsPropSpy.and.returnValue({'test': true});

    expect(component.hasErrors('test'))
      .withContext('control with unpristin value should check errors')
      .toBe(true);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should not be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(0);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should be called')
      .toBe(0);

    expect(errorsPropSpy.calls.count())
      .withContext('control.erorrs should note be called')
      .toBe(1);

    pristinePropSpy.calls.reset();
    touchedPropSpy.calls.reset();
    dirtyPropSpy.calls.reset();
    errorsPropSpy.calls.reset();

    pristinePropSpy.and.returnValue(false);
    touchedPropSpy.and.returnValue(false);
    dirtyPropSpy.and.returnValue(false);
    errorsPropSpy.and.returnValue(null);

    expect(component.hasErrors('test'))
      .withContext('control with unpristin value should check errors')
      .toBe(false);

    expect(pristinePropSpy.calls.count())
      .withContext('control.pristin should not be called')
      .toBe(1);

    expect(touchedPropSpy.calls.count())
      .withContext('control.touched should be called')
      .toBe(0);

    expect(dirtyPropSpy.calls.count())
      .withContext('control.dirty should be called')
      .toBe(0);

    expect(errorsPropSpy.calls.count())
      .withContext('control.erorrs should note be called')
      .toBe(1);
  });

  it('hasError return valid state of control', () => {
    const component = new TestFormComponent();
    component.form;

    component.controlSpy.hasError.and.returnValue(true);

    expect(component.hasError('test', 'test'))
      .withContext('hasError should return true')
      .toBe(true);

    component.controlSpy.hasError.and.returnValue(false);

    expect(component.hasError('test', 'test'))
      .withContext('hasError should return false')
      .toBe(false);
  });
});
