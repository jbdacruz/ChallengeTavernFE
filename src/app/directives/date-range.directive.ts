// date-range.validator.ts
import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appDateRangeValidator][ngModelGroup]', // attach to a group
  providers: [
    { provide: NG_VALIDATORS, useExisting: DateRangeValidatorDirective, multi: true }
  ]
})
export class DateRangeValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const start = control.get('startTime')?.value;
    const end = control.get('endTime')?.value;

    if (!start || !end) return null;
    return end < start ? null : { dateRange: true };
  }
}
