import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  public pageTitle: string;
  public pageCode: boolean = false;
  public pageGraph: boolean = true;
  public polynomialHx: number = 4;
  public polynomialHxRange = [0, 1, 2, 3];
  public selectedBinaryScopeHx = ["1", "0", "1", "1"];
  public polynomialGx: number = 4;
  public polynomialGxRange = [0, 1, 2, 3];
  public selectedBinaryScopeGx = ["1", "0", "0", "1"];
  public polynomialBinaryScopeHGx = [];
  public polynomialBinaryScopeCx: any;
  public polynomialRatioHx: number;
  public polynomialRatioGx: number;

  public input: any = 0;

  constructor() {
  }

  updateTitle(title) {
    this.pageTitle = title;
  }

}
