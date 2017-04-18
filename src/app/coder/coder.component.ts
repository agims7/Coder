import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';
import { AppService } from '../services/app.service';


@Component({
  selector: 'app-coder',
  templateUrl: './coder.component.html',
  styleUrls: ['./coder.component.less']
})
export class CoderComponent implements OnInit {
  private maxHxRange: number = 10;
  private minHxRange: number = 2;
  private maxGxRange: number = 6;
  private minGxRange: number = 2;
  private binaryScope: string[] = ['0', '1'];

  private visibility: boolean = false;

  constructor(
    private appService: AppService,
    private tactsService: TactsService
  ) { }



  iterateHxPolynomial(polynomial, scope, range) {
    if (polynomial > this.maxHxRange) {
      polynomial = 0;
      range = [];
      scope = [];
    } else if (polynomial < this.minHxRange) {
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

  iterateGxPolynomial(polynomial, scope, range) {
    if (polynomial > this.maxGxRange) {
      polynomial = 0;
      range = [];
      scope = [];
    } else if (polynomial < this.minGxRange) {
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
    this.iterateHxPolynomial(this.appService.polynomialHx, this.appService.selectedBinaryScopeHx, this.appService.polynomialHxRange);
    this.setPolynomialRatio();
  }

  updateGxScope() {
    this.appService.selectedBinaryScopeGx = [];
    this.appService.polynomialGxRange = [];
    this.tactsService.tactActive = 0;
    this.iterateGxPolynomial(this.appService.polynomialGx, this.appService.selectedBinaryScopeGx, this.appService.polynomialGxRange);
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
    if (this.checkGx() === true) {
      this.visibility = true;
      this.appService.polynomialRatioHx = null;
      this.appService.polynomialRatioGx = null;
      this.appService.polynomialBinaryScopeHGx = null;
      this.setPolynomialRatio();
      this.appService.polynomialBinaryScopeHGx = this.copy(this.appService.selectedBinaryScopeHx);
      for (var i = 0; i < this.appService.polynomialRatioGx; i++) {
        this.appService.polynomialBinaryScopeHGx.unshift('0');
      }
      while (this.appService.polynomialBinaryScopeHGx[this.appService.polynomialBinaryScopeHGx.length - 1] === '0') {
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
    } else {
      alert('Wartość bitu pierwszego i ostatnigo slowa generujacego g(x) zawsze powinna wynosić 1');
      this.appService.polynomialRatioHx = null;
      this.appService.polynomialRatioGx = null;
      this.appService.polynomialBinaryScopeHGx = null;
    }
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

  checkGx() {
    let last = this.appService.selectedBinaryScopeGx.length - 1;
    if (this.appService.selectedBinaryScopeGx[0] === '1' && this.appService.selectedBinaryScopeGx[last] === '1') {
      return true;
    }
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
    // this.appService.updateTitle('Coder setup');
    this.appService.pageCode = true;
    this.appService.pageGraph = false;

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
