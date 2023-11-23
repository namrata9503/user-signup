import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UiButtonComponent } from './ui-button.component';

@Component({
  template: `
    <ui-button
      [type]="type"
      [text]="text"
      [backgroundColor]="backgroundColor"
      [color]="color"
      [fontSizeRem]="fontSizeRem"
      [widthRem]="widthRem"
      (onClick)="onButtonClick()"
    ></ui-button>
  `,
})
class TestHostComponent {
  type = 'submit';
  text = 'Click me';
  backgroundColor = 'rgb(170, 51, 106)';
  color = 'rgb(255, 255, 255)';
  fontSizeRem = 1.3;
  widthRem = 12;

  onButtonClick() {}
}

describe('UiButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: UiButtonComponent;
  let buttonElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiButtonComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(UiButtonComponent)
    ).componentInstance;
    buttonElement = fixture.debugElement.query(By.css('button'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind input properties', () => {
    expect(component.type).toBe(testHost.type);
    expect(component.text).toBe(testHost.text);
    expect(component.backgroundColor).toBe(testHost.backgroundColor);
    expect(component.color).toBe(testHost.color);
    expect(component.fontSizeRem).toBe(testHost.fontSizeRem);
    expect(component.widthRem).toBe(testHost.widthRem);
  });

  it('should emit onClick event when button is clicked', () => {
    spyOn(testHost, 'onButtonClick');
    buttonElement.nativeElement.click();
    expect(testHost.onButtonClick).toHaveBeenCalled();
  });

  it('should render button element with correct styles and text', () => {
    const buttonStyles = buttonElement.nativeElement.style;
    expect(buttonStyles.color).toBe(testHost.color);
    expect(buttonStyles.backgroundColor).toBe(testHost.backgroundColor);
    expect(buttonStyles.fontSize).toBe(`${testHost.fontSizeRem}rem`);
    expect(buttonStyles.width).toBe(`${testHost.widthRem}rem`);
    expect(buttonElement.nativeElement.textContent.trim()).toBe(testHost.text);
  });

  it('should update styles when input properties change', () => {
    testHost.text = 'Updated Text';
    testHost.backgroundColor = 'rgb(18, 52, 86)';
    testHost.color = 'rgb(0, 0, 0)';
    testHost.fontSizeRem = 2.5;
    testHost.widthRem = 15;
    fixture.detectChanges();

    const buttonStyles = buttonElement.nativeElement.style;

    expect(buttonElement.nativeElement.textContent.trim()).toBe('Updated Text');
    expect(buttonStyles.backgroundColor).toBe('rgb(18, 52, 86)');
    expect(buttonStyles.color).toBe('rgb(0, 0, 0)');
    expect(buttonStyles.fontSize).toBe('2.5rem');
    expect(buttonStyles.width).toBe('15rem');
  });
});
