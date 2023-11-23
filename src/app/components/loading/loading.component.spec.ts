import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { LoadingComponent } from './loading.component';

@Component({
  template: ` <app-loading [isLoading]="isLoading"></app-loading> `,
})
class TestHostComponent {
  isLoading: boolean = false;
}
describe('LoadingComponent', () => {
  let testHostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoadingComponent, TestHostComponent],
    });
    fixture = TestBed.createComponent(LoadingComponent);
    testHostComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponent).toBeTruthy();
  });

  it('should not render the loading spinner when isLoading is false', () => {
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement).toBeFalsy();

    const detailsElement = fixture.nativeElement.querySelector('.details');
    expect(detailsElement).toBeFalsy();
  });

  it('should render the loading spinner when isLoading is true', () => {
    testHostComponent.isLoading = true;
    fixture.detectChanges();

    const containerElement = fixture.nativeElement.querySelector('.container');
    expect(containerElement).toBeTruthy();

    const detailsElement = fixture.nativeElement.querySelector('.details');
    expect(detailsElement).toBeTruthy();

    const spinnerImage = detailsElement.querySelector('img');
    expect(spinnerImage).toBeTruthy();
    expect(spinnerImage.getAttribute('src')).toContain('spinner.svg');

    const loadingText = detailsElement.querySelector('h1');
    expect(loadingText).toBeTruthy();
    expect(loadingText.textContent).toContain('Loading..');
  });
});
