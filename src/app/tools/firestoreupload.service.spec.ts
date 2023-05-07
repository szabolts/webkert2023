import { TestBed } from '@angular/core/testing';

import { FirestoreuploadService } from './firestoreupload.service';

describe('FirestoreuploadService', () => {
  let service: FirestoreuploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreuploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
