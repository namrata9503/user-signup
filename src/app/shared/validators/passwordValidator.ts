import {
  AbstractControl,
  ValidatorFn,
  FormGroup,
  ValidationErrors,
} from '@angular/forms';

export function passwordValidator(minLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password: string = control.value;
    const formGroup = control.parent as FormGroup;

    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);

    const firstName = formGroup?.get('firstName')?.value;
    const lastName = formGroup?.get('lastName')?.value;
    const containsFirstName: boolean = password.includes(firstName);
    const containsLastName: boolean = password.includes(lastName);

    if (!password) {
      return { required: true };
    }
    if (password.length < minLength) {
      return {
        minlength: { requiredLength: minLength, actualLength: password.length },
      };
    }
    if (!hasLowercase || !hasUppercase) {
      return { requireLowerAndUpperCase: true };
    } else if (containsFirstName || containsLastName) {
      return { invalidPassword: true };
    }
    return null;
  };
}
