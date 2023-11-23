import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { FormComponent } from './form.component';
import { TextInputComponent } from '../../components/text-input/text-input.component';
import { TitleComponent } from '../../components/title/title.component';
import { InputValidationComponent } from '../../components/input-validation/input-validation.component';
import { InputContainerComponent } from '../../components/input-container/input-container.component';
import { UiButtonComponent } from '../../components/ui-button/ui-button.component';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(waitForAsync(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['signUp']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule],
      declarations: [
        FormComponent,
        TextInputComponent,
        TitleComponent,
        InputValidationComponent,
        InputContainerComponent,
        UiButtonComponent,
      ],
    });
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.signupForm.get('firstName')?.value).toEqual('');
    expect(component.signupForm.get('lastName')?.value).toEqual('');
    expect(component.signupForm.get('email')?.value).toEqual('');
    expect(component.signupForm.get('password')?.value).toEqual('');
  });

  it('should set isSubmitted to true on submit', () => {
    component.submit();
    expect(component.isSubmitted).toBeTrue();
  });

  it('should not navigate if form is invalid', fakeAsync(() => {
    component.signupForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: '',
    });

    component.submit();
    tick();

    expect(userServiceSpy.signUp).not.toHaveBeenCalled();
  }));

  it('should navigate to / on cancel and reset form values', () => {
    component.signupForm.patchValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    });

    component.cancel();

    expect(component.signupForm.value).toEqual({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  });

  it('should render the form with input fields and buttons', () => {
    const formDebugElement: DebugElement = fixture.debugElement.query(
      By.css('form')
    );
    const inputElements: DebugElement[] = formDebugElement.queryAll(
      By.css('input')
    );
    const buttonElements: DebugElement[] = formDebugElement.queryAll(
      By.css('ui-button')
    );

    expect(formDebugElement).toBeTruthy();
    expect(inputElements.length).toBe(4);
    expect(buttonElements.length).toBe(2);
  });
});
