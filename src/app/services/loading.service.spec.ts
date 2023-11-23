import { TestBed } from '@angular/core/testing';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have loading set to false', (done) => {
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should show loading when showLoading is called', (done) => {
    service.showLoading();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
      done();
    });
  });

  it('should hide loading when hideLoading is called', (done) => {
    service.showLoading(); // Show loading first
    service.hideLoading();
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
      done();
    });
  });

  it('should toggle loading state when showLoading and hideLoading are called', (done) => {
    service.showLoading(); // Show loading
    service.hideLoading(); // Hide loading
    service.isLoading.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
      done();
    });
  });
});
