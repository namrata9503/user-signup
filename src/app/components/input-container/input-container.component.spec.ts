import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputContainerComponent } from './input-container.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'app-test-host',
  template: `
    <app-input-container [label]="label" [backgroundColor]="backgroundColor">
      Test Content
    </app-input-container>
  `,
})
class TestHostComponent {
  label = 'Test Label';
  backgroundColor = '#ff0000';
}

describe('InputContainerComponent', () => {
  let component: InputContainerComponent;
  let fixture: ComponentFixture<InputContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputContainerComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label', () => {
    const labelElement = fixture.nativeElement.querySelector('label');
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should have a background color', () => {
    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should set the provided background color', () => {
    const hostComponent = fixture.componentInstance;
    hostComponent.backgroundColor = '#f00';
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement.style.backgroundColor).toBe('rgb(255, 0, 0)');
  });

  it('should project content', () => {
    const contentElement = fixture.debugElement.query(By.css('.content'));

    expect(contentElement.nativeElement.textContent.trim()).toBe(
      'Test Content'
    );
  });
});
