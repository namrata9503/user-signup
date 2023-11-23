import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputValidationComponent } from './input-validation.component';

@Component({
  template: `
    <app-input-validation
      [control]="formControl"
      [showErrors]="showErrors"
      [errorMessages]="errorMessages"
    ></app-input-validation>
  `,
})
class TestHostComponent {
  formControl = new FormControl('');
  errorMessages: string[] = [];
  showErrors: boolean = true;
}

describe('InputValidationComponent', () => {
  let component: InputValidationComponent;
  let fixture: ComponentFixture<InputValidationComponent>;
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;
  let inputValidationComponent: InputValidationComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputValidationComponent, TestHostComponent],
      imports: [FormsModule, ReactiveFormsModule],
    }).compileComponents();

    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    debugElement = testHostFixture.debugElement.query(
      By.directive(InputValidationComponent)
    );
    inputValidationComponent = debugElement.componentInstance;
    testHostFixture.detectChanges();
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should create', () => {
    expect(inputValidationComponent).toBeTruthy();
  });

  it('should check validation and update errorMessages on control valueChanges', fakeAsync(() => {
    testHostComponent.formControl.setErrors({ required: true });
    tick();

    expect(inputValidationComponent.errorMessages).toEqual([
      'Please fill empty field.',
    ]);
  }));

  it('should check validation and update errorMessages on control statusChanges', fakeAsync(() => {
    testHostComponent.formControl.setErrors({ invalidEmail: true });
    tick();

    expect(inputValidationComponent.errorMessages).toEqual([
      'Please enter a valid email address.',
    ]);
  }));

  it('should reset errorMessages when there are no errors', fakeAsync(() => {
    testHostComponent.formControl.setErrors(null);
    tick();

    expect(inputValidationComponent.errorMessages).toEqual([]);
  }));

  it('should display error messages when showErrors is true', () => {
    inputValidationComponent.errorMessages = ['Error 1', 'Error 2'];
    testHostFixture.detectChanges();

    const errorListElement =
      testHostFixture.nativeElement.querySelector('.error-list');
    expect(errorListElement).toBeTruthy();

    const errorMessageElements =
      testHostFixture.nativeElement.querySelectorAll('.error-list div');

    expect(errorMessageElements.length).toBe(2);
    expect(errorMessageElements[0].textContent).toContain('Error 1');
    expect(errorMessageElements[1].textContent).toContain('Error 2');
  });

  it('should not display error messages when showErrors is false', () => {
    inputValidationComponent.errorMessages = ['Error 1', 'Error 2'];
    inputValidationComponent.showErrors = false;
    testHostFixture.detectChanges();

    const errorListElement =
      testHostFixture.nativeElement.querySelector('.error-list');
    expect(errorListElement).toBeFalsy();
  });

  it('should not display error messages when errorMessages is empty', () => {
    inputValidationComponent.errorMessages = [];
    testHostFixture.detectChanges();

    const errorListElement =
      testHostFixture.nativeElement.querySelector('.error-list');
    expect(errorListElement).toBeTruthy();
  });
});
