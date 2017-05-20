import { Injectable } from '@angular/core';

@Injectable()
export class TactsService {
  public tacts: number;
  public tactActive: number = 0
  public P: any = [0, 0, 0, 0, 0];
  public oldP: any = [0, 0, 0, 0, 0];
  public output = 0;
  public oldOutput = 0;
  public outputCoderFull: any;
  public outputCoder: number = 0;
  public switch: boolean = false;
  public finalCxforListing: any = [];

  constructor() { }

}
