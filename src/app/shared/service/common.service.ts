import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsDirty();
                control.updateValueAndValidity();
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
}


