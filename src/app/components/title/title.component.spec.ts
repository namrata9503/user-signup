import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TitleComponent } from './title.component';

@Component({
  template: `
    <app-title
      [title]="title"
      [margin]="margin"
      [fontSize]="fontSize"
    ></app-title>
  `,
})
class TestHostComponent {
  title = 'Test Title';
  margin = '1rem 0 1rem 0.2rem';
  fontSize = '1.7rem';
}

describe('TitleComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let testHost: TestHostComponent;
  let component: TitleComponent;
  let titleElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
    component = fixture.debugElement.query(
      By.directive(TitleComponent)
    ).componentInstance;
    titleElement = fixture.debugElement.query(By.css('h1'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should bind title, margin, and fontSize', () => {
    expect(component.title).toBe(testHost.title);
    expect(component.margin).toBe(testHost.margin);
    expect(component.fontSize).toBe(testHost.fontSize);
  });

  it('should render title element with correct text and styles', () => {
    expect(titleElement.nativeElement.textContent.trim()).toBe('Test Title');
    expect(titleElement.nativeElement.style.margin).toBe(
      '1rem 0px 1rem 0.2rem'
    );
    expect(titleElement.nativeElement.style.fontSize).toBe('1.7rem');
  });

  it('should update styles when input properties change', () => {
    testHost.title = 'Updated Title';
    testHost.margin = '2rem';
    testHost.fontSize = '2rem';
    fixture.detectChanges();

    expect(titleElement.nativeElement.textContent.trim()).toBe('Updated Title');
    expect(titleElement.nativeElement.style.margin).toBe('2rem');
    expect(titleElement.nativeElement.style.fontSize).toBe('2rem');
  });
});
