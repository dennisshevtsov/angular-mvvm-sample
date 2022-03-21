import { AbstractControl, ValidationErrors, } from '@angular/forms';

export function timePeriodValidator(timePeriodControl: AbstractControl)
  : ValidationErrors | null {
  const fullDayControl = timePeriodControl.get('fullDay');

  if (fullDayControl && !fullDayControl.value) {
    const startControl = timePeriodControl.get('start')!;
    const startControlValue = getControlValue(startControl);
    const startControlError = getControlError(startControlValue);

    startControl.setErrors(startControlError);

    const endControl = timePeriodControl.get('end')!;
    const endControlValue = getControlValue(endControl);
    const endControlError = getControlError(startControlValue);

    endControl.setErrors(endControlError);

    if (startControlValue && endControlValue) {
      const startParts = startControlValue.split(':');
      const endParts = endControlValue.split(':');

      if (startParts[0] > endParts[0] ||
          (startParts[0] == endParts[0] &&
           startParts[1] >= endParts[1])) {
        startControl.setErrors({
          startBeforeEnd: true,
        });
        endControl.setErrors({
          startBeforeEnd: true,
        });
      }
    }
  }

  return null;
}

function getControlValue(control: AbstractControl) {
  let controlValue;

  if (!control.pristine || control.touched || control.dirty) {
    controlValue = control.value;
  }

  return controlValue;
}

function getControlError(controlValue: string)
  : ValidationErrors | null {
  let controlError: ValidationErrors | null = null;

  if (controlValue === '') {
    controlError =  {
      required: true,
    };
  }

  return controlError;
}
