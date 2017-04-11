import { TestBed, inject } from '@angular/core/testing';
import { TactsService } from './tacts.service';

describe('TactsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TactsService]
    });
  });

  it('should ...', inject([TactsService], (service: TactsService) => {
    expect(service).toBeTruthy();
  }));
});
