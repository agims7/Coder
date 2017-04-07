import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coder',
  templateUrl: './coder.component.html',
  styleUrls: ['./coder.component.less']
})
export class CoderComponent implements OnInit {
  private maxRange: number = 15;
  private minRange: number = 1;
  private binaryScope: string[] = ['0', '1'];
  private polynomialHx: number = 6;
  private polynomialHxRange = [];
  private selectedBinaryScopeHx = [];
  private polynomialGx: number = 4;
  private polynomialGxRange = [];
  private selectedBinaryScopeGx = [];

  constructor() { }

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

  updateHxScope() {
    this.selectedBinaryScopeHx = [];
    this.polynomialHxRange = [];
    this.iteratePolynomial(this.polynomialHx, this.selectedBinaryScopeHx, this.polynomialHxRange);
  }

  updateGxScope() {
    this.selectedBinaryScopeGx = [];
    this.polynomialGxRange = [];
    this.iteratePolynomial(this.polynomialGx, this.selectedBinaryScopeGx, this.polynomialGxRange);
  }

  ngOnInit() {
     this.updateHxScope();
     this.updateGxScope();
  }

}
