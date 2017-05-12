import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public pageTitle: string;
  public pageCode: boolean = false;
  public pageGraph: boolean = true;
  public polynomialHx: number = 10;
  public polynomialHxRange = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  public selectedBinaryScopeHx = ["1", "0", "1", "0", "0", "1", "0", "0", "0","1"];
  public polynomialGx: number = 6;
  public polynomialGxRange = [0, 1, 2, 3, 4, 5];
  public selectedBinaryScopeGx = ["1", "0", "1", "0", "1", "1"];
  public polynomialBinaryScopeHGx = [];
  public polynomialBinaryScopeCx: any;
  public polynomialRatioHx: number;
  public polynomialRatioGx: number;
  public finalPolynomial: string = '';
  public calculationDone = false;
  public htmlRatioThree: boolean = false;
  public htmlRatioFour: boolean = false;
  public htmlRatioFive: boolean = false;
  public htmlRatioSix: boolean = false;
  public htmlFlipFlopThree: boolean = false;
  public htmlFlipFlopFour: boolean = false;
  public htmlFlipFlopFive: boolean = false;
  public htmlFlipFlopSix: boolean = false;

  public input: any = 0;

  constructor() {
  }

  updateTitle(title) {
    this.pageTitle = title;
  }

}
