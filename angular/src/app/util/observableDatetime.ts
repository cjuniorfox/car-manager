import { FormControl } from '@angular/forms';
import { merge } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { addTimeToDate } from './addTimeToDate';

export function observablDatetime(
    dateInput: FormControl,
    timeInput: FormControl,
    dateTimeForm: FormControl
): void {
    merge(
        dateInput.valueChanges,
        timeInput.valueChanges
    ).pipe(
        map(() => dateInput.value as Date),
        tap(val => dateTimeForm.setValue(val)),
        map(() => timeInput.value as string),
        filter(strHora => strHora != 'InvalidDateTime' && dateInput.value)
    ).subscribe(strHora => {
            dateTimeForm.setValue(addTimeToDate(strHora, new Date(dateInput.value)))
    });
}