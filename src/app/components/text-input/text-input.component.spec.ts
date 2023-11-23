import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormsModule,
  Validators,
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { TextInputComponent } from './text-input.component';
import { InputContainerComponent } from '../input-container/input-container.component';
import { InputValidationComponent } from '../input-validation/input-validation.component';

@Component({
  template: `
    <app-input-container [label]="label">
      <input [type]="type" [placeholder]="label" [formControl]="formControl" />
      <app-input-validation
        [control]="control"
        [showErrors]="showErrors"
      ></app-input-validation>
    </app-input-container>
  `,
})
class TestHostComponent {
  label = 'Test Label';
  type = 'text';
  formControl = new FormControl();
  control = new FormControl();
  showErrors = true;
}

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TextInputComponent,
        InputContainerComponent,
        InputValidationComponent,
        TestHostComponent,
      ],
      imports: [FormsModule, ReactiveFormsModule],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHost).toBeTruthy();
  });
  it('should pass label to InputContainerComponent', () => {
    const inputContainer = fixture.debugElement.query(
      By.directive(InputContainerComponent)
    );
    expect(inputContainer.componentInstance.label).toBe('Test Label');
  });
  it('should pass type and placeholder to input element', () => {
    const inputElement: DebugElement = fixture.debugElement.query(
      By.css('input')
    );
    expect(inputElement.nativeElement.getAttribute('type')).toBe('text');
    expect(inputElement.nativeElement.getAttribute('placeholder')).toBe(
      'Test Label'
    );
  });
  it('should pass form control to InputValidationComponent', () => {
    const inputValidation = fixture.debugElement.query(
      By.directive(InputValidationComponent)
    );
    expect(inputValidation.componentInstance.control).toBe(testHost.control);
  });

  it('should pass showErrors to InputValidationComponent', () => {
    const inputValidation = fixture.debugElement.query(
      By.directive(InputValidationComponent)
    );
    expect(inputValidation.componentInstance.showErrors).toBe(true);
  });

  it('should render input element with correct attributes', () => {
    expect(inputElement.nativeElement.getAttribute('type')).toBe('text');
    expect(inputElement.nativeElement.getAttribute('placeholder')).toBe(
      'Test Label'
    );
  });
});
