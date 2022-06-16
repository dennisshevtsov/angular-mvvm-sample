import { AbstractControl, ValidationErrors, } from '@angular/forms';

import { MILLISECONDS_IN_DAY, } from 'src/app/core/date';

export function timePeriodValidator(timePeriodControl: AbstractControl)
  : ValidationErrors | null {
  const errors: ValidationErrors = {};
  const fullDayControl = timePeriodControl.get('fullDay')!;
  const startControl = timePeriodControl.get('start')!;
  const endControl = timePeriodControl.get('end')!;

  if (!fullDayControl.value &&
      (!timePeriodControl.pristine ||
        timePeriodControl.touched ||
        timePeriodControl.dirty)) {
    const startControlValue = startControl.value.value ?? startControl.value;
    const startControlError = getControlError(startControlValue);

    startControl.setErrors(startControlError);

    if (startControlError) {
      errors['startRequired'] = true;
    }

    const endControlValue = endControl.value.value ?? endControl.value;
    const endControlError = getControlError(startControlValue);

    if (endControlError) {
      errors['endRequired'] = true;
    }

    endControl.setErrors(endControlError);

    if (startControlValue && endControlValue &&
        startControlValue >= endControlValue) {
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
  else {
    startControl.setErrors(null);
    endControl.setErrors(null);
  }

  return errors;
}

function getControlError(controlValue: undefined | number)
  : ValidationErrors | null {
  let controlError: ValidationErrors | null = null;

  if (!controlValue ||
       controlValue === controlValue % MILLISECONDS_IN_DAY) {
    controlError =  {
      required: true,
    };
  }

  return controlError;
}
