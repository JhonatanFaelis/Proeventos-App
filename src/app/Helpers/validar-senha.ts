import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidarSenha {
    static MustMatch(controlName: string, matchingName : string) : any{
        return (group: AbstractControl) => {
            const formGroup = group as FormGroup;
            const control = formGroup.controls[controlName];
            const matchingControlName = formGroup.controls[matchingName];

            if (matchingControlName.errors) {
                return null;
            }
            if (control.value !== matchingControlName.value) {
                matchingControlName.setErrors({ mustMatch: true });
            } else {
                matchingControlName.setErrors(null);
            }
            return null;
        }
    }
}
