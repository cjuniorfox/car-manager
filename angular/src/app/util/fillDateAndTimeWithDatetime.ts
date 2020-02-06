import { FormControl } from '@angular/forms';

export function fillDateAndTimeWithDatetime(dateInput: FormControl, timeInput: FormControl, dateTimeForm: FormControl) {
    if (dateTimeForm.value) {
        const date = new Date(dateTimeForm.value);
        timeInput.setValue(date.getHours() + ':' + date.getMinutes());
        dateInput.setValue(date);
    }
}