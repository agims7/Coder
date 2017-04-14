import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public polynomialHx: number = 4;
  public polynomialHxRange = [0, 1, 2, 3];
  public selectedBinaryScopeHx = ["1", "0", "1", "1"];
  public polynomialGx: number = 3;
  public polynomialGxRange = [0, 1, 2];
  public selectedBinaryScopeGx = ["1", "0", "1"];
  public polynomialBinaryScopeHGx = [];
  public polynomialRatioHx: number;
  public polynomialRatioGx: number;

  public input: string  = '0';

  constructor() { }

}
