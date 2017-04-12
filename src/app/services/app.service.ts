import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public polynomialHx: number = 6;
  public polynomialHxRange = [0, 1, 2, 3, 4, 5];
  public selectedBinaryScopeHx = ["0", "0", "0", "0", "0", "0"];
  public polynomialGx: number = 4;
  public polynomialGxRange = [0, 1, 2, 3];
  public selectedBinaryScopeGx = ["0", "0", "0", "0"];
  public polynomialBinaryScopeHGx = [];

  constructor() { }

}
