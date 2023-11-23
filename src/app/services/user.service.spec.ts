import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from './user.service';
import { User } from '../shared/model/user';
import { USER_SIGNUP_URL } from '../shared/constants/urls';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have an initial empty user', () => {
    expect(service.currentUser).toEqual(jasmine.objectContaining({}));
  });

  it('should signUp and update user', (done) => {
    const mockUser: User = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    service.signUp(mockUser).subscribe((user) => {
      expect(user).toEqual(mockUser);
      expect(service.currentUser).toEqual(mockUser);
      done();
    });

    const req = httpMock.expectOne(USER_SIGNUP_URL);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  it('should handle localStorage', () => {
    const mockUser: User = {
      id: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    };

    service.setUserToLocalStorage(mockUser);

    expect(localStorage.getItem('User')).toBeTruthy();

    const storedUser = service.getUserFromLocalStorage();

    expect(storedUser).toEqual(mockUser);
  });
});
