import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { UserService } from '../../services/user.service';
import { UiButtonComponent } from '../../components/ui-button/ui-button.component';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userService = jasmine.createSpyObj('UserService', ['goBack']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent, UiButtonComponent],
      providers: [{ provide: UserService, useValue: userService }],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call UserService.goBack on goBack()', () => {
    component.goBack();

    expect(userService.goBack).toHaveBeenCalled();
  });

  it('should display "Thank You For Signing Up!" heading', () => {
    const headingElement = fixture.debugElement.query(By.css('.heading'));
    expect(headingElement.nativeElement.textContent).toContain(
      'Thank You For Signing Up!'
    );
  });

  it('should display information paragraphs', () => {
    component.text = ['Lorem ipsum', 'Dolor sit amet'];
    fixture.detectChanges();

    const infoElements = fixture.debugElement.queryAll(By.css('.info p'));
    expect(infoElements.length).toBe(2);
    expect(infoElements[0].nativeElement.textContent).toContain('Lorem ipsum');
    expect(infoElements[1].nativeElement.textContent).toContain(
      'Dolor sit amet'
    );
  });

  it('should call UserService.goBack on button click', () => {
    const goBackButton = fixture.debugElement.query(
      By.css('.button-container ui-button')
    );
    goBackButton.triggerEventHandler('click', null);

    expect(userService.goBack).toHaveBeenCalled();
  });
});
