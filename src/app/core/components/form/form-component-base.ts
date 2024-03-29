import { FormControl, FormGroup } from '@angular/forms';

export type FormScheme<T> = {
  [K in keyof T]: FormControl<T[K] | null>;
}

export abstract class FormComponentBase<T> {
  private formValue: FormGroup<FormScheme<T>> | undefined;

  public get form(): FormGroup<FormScheme<T>> {
    return this.formValue ?? (this.formValue = this.buildForm());
  }

  protected abstract buildForm(): FormGroup<FormScheme<T>>;

  public validateForm(): void {
    this.validateFormGroup(this.form);
  }

  protected validateFormGroup(formGroup: FormGroup): void {
    Object.keys(formGroup.controls)
          .forEach(controlName => {
            const control = formGroup.get(controlName)!;

            control.markAsTouched({
              onlySelf: true,
            });
            control.updateValueAndValidity();

            if (control instanceof FormGroup) {
              this.validateFormGroup(control);
            }
          })
  }

  public isValid(controlName: string): boolean {
    const control = this.form.get(controlName);

    return control == null || (control.pristine && !control.touched && !control.dirty) || control.valid;
  }

  public hasErrors(controlName: string): boolean {
    const control = this.form.get(controlName);

    return control != null && (!control.pristine || control.touched || control.dirty) && control.errors != null;
  }

  public hasError(controlName: string, errorCode: string): boolean {
    const control = this.form.get(controlName);

    return control != null && control.hasError(errorCode);
  }
}
