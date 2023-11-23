import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATORS_MESSAGES: any = {
  required: 'Please fill empty field.',
  invalidEmail: 'Please enter a valid email address.',
  minlength: 'Field is too short.',
  invalidPassword: 'Should not contain your first or last name.',
  requireLowerAndUpperCase:
    'Password must contain both lowercase and uppercase characters.',
};

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.scss'],
})
export class InputValidationComponent implements OnInit, OnChanges {
  @Input() control!: AbstractControl;
  @Input() showErrors: boolean = true;
  @Input() errorMessages: string[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }

  ngOnInit(): void {
    this.control.valueChanges.subscribe(() => {
      this.checkValidation();
    });
    this.control.statusChanges.subscribe(() => {
      this.checkValidation();
    });
  }

  checkValidation() {
    const errors = this.control.errors;
    if (!errors) {
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    this.errorMessages = errorKeys.map((key) => VALIDATORS_MESSAGES[key]);
  }
}
