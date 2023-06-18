/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DonationService } from './donation.service';

describe('Service: Donation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DonationService]
    });
  });

  it('should ...', inject([DonationService], (service: DonationService) => {
    expect(service).toBeTruthy();
  }));
});
