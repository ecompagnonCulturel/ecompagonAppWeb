import { TestBed } from '@angular/core/testing';

import { ResourceAPIService } from './resource-api.service';

describe('ResourceAPIService', () => {
  let service: ResourceAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResourceAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
