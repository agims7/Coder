import { Injectable } from '@angular/core';

@Injectable()
export class TactsService {
  public tacts: number;
  public tactActive: number = 0

  constructor() { }

}
