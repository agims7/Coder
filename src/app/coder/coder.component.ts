import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';


@Component({
  selector: 'app-coder',
  templateUrl: './coder.component.html',
  styleUrls: ['./coder.component.less']
})
export class CoderComponent implements OnInit {
  private maxRange: number = 15;
  private minRange: number = 1;
  private binaryScope: string[] = ['0', '1'];
  private polynomialHx: number;
  private polynomialHxRange = [];
  private selectedBinaryScopeHx = [];
  private polynomialGx: number;
  private polynomialGxRange = [];
  private selectedBinaryScopeGx = [];
  private polynomialRatio: number;
  private polynomialBinaryScopeHGx = [];

  private visibility: boolean = false;

  constructor(
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
    console.log('selectedBinaryScopeHx ', this.selectedBinaryScopeHx);
    console.log('selectedBinaryScopeGx ', this.selectedBinaryScopeGx);
  }

  updateHxScope() {
    this.selectedBinaryScopeHx = [];
    this.polynomialHxRange = [];
    this.tactsService.tactActive = 0;
    this.iteratePolynomial(this.polynomialHx, this.selectedBinaryScopeHx, this.polynomialHxRange);
    this.tactsService.tacts = (this.polynomialHx - 1) + (this.polynomialGx - 1);
    // console.log('selectedBinaryScopeHx ', this.selectedBinaryScopeHx)

  }

  updateGxScope() {
    this.selectedBinaryScopeGx = [];
    this.polynomialGxRange = [];
    this.tactsService.tactActive = 0;
    this.iteratePolynomial(this.polynomialGx, this.selectedBinaryScopeGx, this.polynomialGxRange);
    this.tactsService.tacts = (this.polynomialHx - 1) + (this.polynomialGx - 1);
    // console.log('selectedBinaryScopeGx ', this.selectedBinaryScopeGx)
  }

  checkPolynomialRatio() {
    this.visibility = true;
    this.polynomialRatio = null;
    this.polynomialBinaryScopeHGx = null;
    this.polynomialRatio = this.polynomialGx - 1;
    this.polynomialBinaryScopeHGx = this.copy(this.selectedBinaryScopeHx);
    for (var i = 0; i < this.polynomialRatio; i++) {
      this.polynomialBinaryScopeHGx.unshift('0');
    }
    // console.log(this.polynomialBinaryScopeHGx);
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

  ngOnInit() {
    this.tactsService.tacts = (this.polynomialHx - 1) + (this.polynomialGx - 1);
    // console.log('polynomialHx ', this.polynomialHx, 'polynomialGx ', this.polynomialGx, 'polynomialHxRange ', this.polynomialHxRange, 'polynomialGxRange ', this.polynomialGxRange, 'this.tactsService.tacts ', this.tactsService.tacts);
  }

}
