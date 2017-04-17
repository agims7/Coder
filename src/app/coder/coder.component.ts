import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-coder',
  templateUrl: './coder.component.html',
  styleUrls: ['./coder.component.less']
})
export class CoderComponent implements OnInit {
  private maxRange: number = 10;
  private minRange: number = 1;
  private binaryScope: string[] = ['0', '1'];

  private visibility: boolean = false;

  constructor(
    private appService: AppService,
    private tactsService: TactsService
  ) { }

  calculate() {
  }

  iteratePolynomial(polynomial, scope, range) {
    if (polynomial > this.maxRange) {
      polynomial = 0;
      range = [];
      scope = [];
    } else if (polynomial < this.minRange) {
      polynomial = 0;
      range = [];
      scope = [];
    } else {
      for (var i = 0; i < polynomial; i++) {
        scope.push('0');
        range.push(i);
      }
    }
  }

  check() {
    console.log('selectedBinaryScopeHx ', this.appService.selectedBinaryScopeHx);
    console.log('selectedBinaryScopeGx ', this.appService.selectedBinaryScopeGx);
  }

  updateHxScope() {
    this.appService.selectedBinaryScopeHx = [];
    this.appService.polynomialHxRange = [];
    this.tactsService.tactActive = 0;
    this.iteratePolynomial(this.appService.polynomialHx, this.appService.selectedBinaryScopeHx, this.appService.polynomialHxRange);
    this.setPolynomialRatio();
  }

  updateGxScope() {
    this.appService.selectedBinaryScopeGx = [];
    this.appService.polynomialGxRange = [];
    this.tactsService.tactActive = 0;
    this.iteratePolynomial(this.appService.polynomialGx, this.appService.selectedBinaryScopeGx, this.appService.polynomialGxRange);
    this.setPolynomialRatio();
  }

  setPolynomialRatio() {
    this.appService.polynomialRatioHx = this.appService.selectedBinaryScopeHx.lastIndexOf('1');
    if (this.appService.polynomialRatioHx < 1) {
      this.appService.polynomialRatioHx = 0
    }
    this.appService.polynomialRatioGx = this.appService.selectedBinaryScopeGx.lastIndexOf('1');
    if (this.appService.polynomialRatioGx < 1) {
      this.appService.polynomialRatioGx = 0
    }
        this.tactsService.tacts = this.appService.polynomialRatioHx + this.appService.polynomialRatioGx + 1;
        // TO TRZEBA SPRAWDZIC!!!!
  }

  checkPolynomialRatio() {
    this.visibility = true;
    this.appService.polynomialRatioHx = null;
    this.appService.polynomialRatioGx = null;
    this.appService.polynomialBinaryScopeHGx = null;
    this.setPolynomialRatio();
    this.appService.polynomialBinaryScopeHGx = this.copy(this.appService.selectedBinaryScopeHx);
    for (var i = 0; i < this.appService.polynomialRatioGx; i++) {
      this.appService.polynomialBinaryScopeHGx.unshift('0');
    }
    while (this.appService.polynomialBinaryScopeHGx[this.appService.polynomialBinaryScopeHGx.length -1] === '0') {
      this.appService.polynomialBinaryScopeHGx.pop();
    }
    console.log('polynomialHx ', this.appService.polynomialHx)
    console.log('polynomialGx ', this.appService.polynomialGx)
    console.log('polynomialHxRange ', this.appService.polynomialHxRange)
    console.log('polynomialGxRange ', this.appService.polynomialGxRange)
    console.log('selectedBinaryScopeHx ', this.appService.selectedBinaryScopeHx)
    console.log('selectedBinaryScopeGx ', this.appService.selectedBinaryScopeGx)
    console.log('polynomialBinaryScopeHGx ', this.appService.polynomialBinaryScopeHGx)
    console.log('this.appService.polynomialRatioHx ', this.appService.polynomialRatioHx);
    console.log('this.appService.polynomialRatioGx ', this.appService.polynomialRatioGx);
    console.log('this.tactsService.tacts ', this.tactsService.tacts)
  }

  copy(o) {
    let output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? this.copy(v) : v;
    }
    return output;
  }

  resetAll() {
    this.appService.polynomialHx = 0;
    this.appService.polynomialGx = 0;
    this.appService.polynomialHxRange = [];
    this.appService.polynomialGxRange = [];
    this.appService.selectedBinaryScopeHx = [];
    this.appService.selectedBinaryScopeGx = [];
    this.appService.polynomialBinaryScopeHGx = [];
    this.tactsService.tactActive = 0;
    this.tactsService.tacts = 0;
  }

  ngOnInit() {
    this.tactsService.tacts = (this.appService.polynomialHx - 1) + (this.appService.polynomialGx - 1);
    console.log('polynomialHx ', this.appService.polynomialHx)
    console.log('polynomialGx ', this.appService.polynomialGx)
    console.log('polynomialHxRange ', this.appService.polynomialHxRange)
    console.log('polynomialGxRange ', this.appService.polynomialGxRange)
    console.log('selectedBinaryScopeHx ', this.appService.selectedBinaryScopeHx)
    console.log('selectedBinaryScopeGx ', this.appService.selectedBinaryScopeGx)
    console.log('polynomialBinaryScopeHGx ', this.appService.polynomialBinaryScopeHGx)
    console.log('this.appService.polynomialRatioHx ', this.appService.polynomialRatioHx);
    console.log('this.appService.polynomialRatioGx ', this.appService.polynomialRatioGx);
    console.log('this.tactsService.tacts ', this.tactsService.tacts)
  }

}
