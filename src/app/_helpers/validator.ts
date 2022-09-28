import { Injectable } from '@angular/core';
import {FormControl, FormGroup, ValidatorFn} from '@angular/forms';
@Injectable({ providedIn: 'root' })
export class Validator {

    static mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }
            // set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
            return null;
        };
    }
    public  validatePassword(): ValidatorFn{

       return(formGroup: FormGroup) => {
           const passwordControl = formGroup.get('passwordAUsers').value;
           const confirmPasswordControl = formGroup.get('confirmpasswordAUsers').value;
           if (passwordControl !== confirmPasswordControl) {
               return {invalidPassword: true};
           }
           return null;
       };

    }



    public  validateMail(fc: FormControl){
        const uqtr = '@uqtr.ca';
        const mail = fc.value.toLowerCase();
        if (mail.slice(-8) !== uqtr){
            return ({invalidMail: true});
        } else {
            return (null);
        }
    }

}
