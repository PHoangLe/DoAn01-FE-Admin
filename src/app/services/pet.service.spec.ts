/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PetService } from './pet.service';

describe('Service: PetAdopt', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetService]
    });
  });

  it('should ...', inject([PetService], (service: PetService) => {
    expect(service).toBeTruthy();
  }));
});
