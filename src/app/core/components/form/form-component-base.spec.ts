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

    this.controlSpyValue = jasmine.createSpyObj(AbstractControl, ['markAsTouched', 'updateValueAndValidity']);

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
      .withContext('controls prop should be called')
      .toBe(1);
  });
});
