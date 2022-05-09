import { AbstractControl, ValidationErrors, } from '@angular/forms';

export function timePeriodValidator(timePeriodControl: AbstractControl)
  : ValidationErrors | null {
  const errors: ValidationErrors = {};
  const fullDayControl = timePeriodControl.get('fullDay')!;

  if (!fullDayControl.value &&
      (!timePeriodControl.pristine ||
        timePeriodControl.touched ||
        timePeriodControl.dirty)) {
    const startControl = timePeriodControl.get('start')!;
    const startControlValue = startControl.value;
    const startControlError = getControlError(startControlValue);

    startControl.setErrors(startControlError);

    if (startControlError) {
      errors['startRequired'] = true;
    }

    const endControl = timePeriodControl.get('end')!;
    const endControlValue = endControl.value;
    const endControlError = getControlError(startControlValue);

    if (endControlError) {
      errors['endRequired'] = true;
    }

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
        startControl.markAsTouched({
          onlySelf: true,
        });

        endControl.setErrors({
          startBeforeEnd: true,
        });
        endControl.markAsTouched({
          onlySelf: true,
        });

        errors['startBeforeEnd'] = true;
      }
    }
  }

  return errors;
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
