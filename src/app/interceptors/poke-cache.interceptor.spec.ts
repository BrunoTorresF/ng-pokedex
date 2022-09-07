import { TestBed } from '@angular/core/testing';

import { PokeCacheInterceptor } from './poke-cache.interceptor';

describe('PokeCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PokeCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PokeCacheInterceptor = TestBed.inject(PokeCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
