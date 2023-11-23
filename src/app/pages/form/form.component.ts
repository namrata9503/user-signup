import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { passwordValidator } from 'src/app/shared/validators/passwordValidator';
import { emailValidator } from 'src/app/shared/validators/emailValidator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitted = false;

  constructor(
    public userService: UserService,
    public formBuilder: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      lastName: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [emailValidator()]],
      password: ['', [passwordValidator(8)]],
    });
  }

  get data() {
    return this.signupForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if (this.signupForm.invalid) return;

    const formData = this.signupForm.value;
    const user = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    this.userService.signUp(formData).subscribe((_) => {
      this.router.navigateByUrl('/home');
    });
  }

  cancel() {
    Object.keys(this.signupForm.controls).forEach((key: any) => {
      this.signupForm.controls[key].setValue('');
      this.router.navigate(['/']);
    });
  }
}
