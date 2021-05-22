import { TestBed } from '@angular/core/testing';

import { PokecacheService } from './pokecache.service';

describe('PokecacheService', () => {
  let service: PokecacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokecacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
