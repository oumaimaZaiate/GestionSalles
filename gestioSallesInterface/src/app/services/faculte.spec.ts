import { TestBed } from '@angular/core/testing';

import { Faculte } from './faculte';

describe('Faculte', () => {
  let service: Faculte;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Faculte);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
