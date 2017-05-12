import { Injectable } from '@angular/core';

@Injectable()
export class TactsService {
  public tacts: number;
  public tactActive: number = 0
  public P: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  public output = 0;

  constructor() { }

}
