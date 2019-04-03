import { AbstractControl, ValidatorFn } from '@angular/forms';

export class emailMatcherValidator {
    static courrielDifferents(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            if (!c.get('courriel').value || !c.get('courrielConfirmation').value) {
                return null;
            }
            return c.get('courriel').value ===
                c.get('courrielConfirmation').value ? null : { 'CourrielsDifferents': true };
        };
    }
} 