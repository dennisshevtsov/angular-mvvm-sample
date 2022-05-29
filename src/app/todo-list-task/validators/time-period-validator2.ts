import { AbstractControl, ValidationErrors, } from '@angular/forms';

export function timePeriodValidator2(timePeriodControl: AbstractControl)
  : ValidationErrors | null {
  const errors: ValidationErrors = {};
  const fullDayControl = timePeriodControl.get('fullDay')!;
  const startControl = timePeriodControl.get('start')!;
  const endControl = timePeriodControl.get('end')!;

  if (!fullDayControl.value &&
      (!timePeriodControl.pristine ||
        timePeriodControl.touched ||
        timePeriodControl.dirty)) {
    const startControlValue = startControl.value;
    const startControlError = getControlError(startControlValue);

    startControl.setErrors(startControlError);

    if (startControlError) {
      errors['startRequired'] = true;
    }

    const endControlValue = endControl.value;
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
