import { TestBed, inject } from '@angular/core/testing';

import { WineApiService } from './wine-api.service';

describe('WineApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WineApiService]
    });
  });

  it('should be created', inject([WineApiService], (service: WineApiService) => {
    expect(service).toBeTruthy();
  }));
});
