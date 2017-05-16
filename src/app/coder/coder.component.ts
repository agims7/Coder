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
  private warningHx: boolean = false;
  private warningGx: boolean = false;
  private polyn = "x^4 + x + 1";
  private result;
  private inputHx: string;
  private inputGx: string;
  private newHxValue: string[];
  private newGxValue: string[];
  private max: number;
  private wrongPolynomial: boolean = false;
  
  private polynomialHGxbeforeTacts: any;
  private finalPolynomialBeforeTacts: any;

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
      for (let i = 0; i < polynomial; i++) {
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
      for (let i = 0; i < polynomial; i++) {
        scope.push('0');
        range.push(i);
      }
    }
  }

  updateHxScope() {
    this.appService.selectedBinaryScopeHx = [];
    this.appService.polynomialHxRange = [];
    this.tactsService.tactActive = 0;
    this.iterateHxPolynomial(this.appService.polynomialHx, this.appService.selectedBinaryScopeHx, this.appService.polynomialHxRange);
    this.setPolynomialRatio();
    this.inputHx = null;
  }

  updateGxScope() {
    this.appService.selectedBinaryScopeGx = [];
    this.appService.polynomialGxRange = [];
    this.tactsService.tactActive = 0;
    this.iterateGxPolynomial(this.appService.polynomialGx, this.appService.selectedBinaryScopeGx, this.appService.polynomialGxRange);
    this.setPolynomialRatio();
    this.inputGx = null;
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

  resetTacts() {
    this.appService.input = 0;
    this.tactsService.tactActive = 0
    this.tactsService.P = [0, 0, 0, 0, 0];
    this.tactsService.output = 0;
  }

  checkPolynomialRatio() {
    this.resetTacts();
    console.log('polynomialHx ', this.appService.polynomialHx)
    console.log('polynomialGx ', this.appService.polynomialGx)
    if (this.appService.polynomialHx >= this.appService.polynomialGx) {
      if (this.checkGx() === true) {
        this.visibility = true;
        this.appService.polynomialRatioHx = null;
        this.appService.polynomialRatioGx = null;
        this.appService.polynomialBinaryScopeHGx = null;
        this.setPolynomialRatio();
        this.appService.polynomialBinaryScopeHGx = this.copy(this.appService.selectedBinaryScopeHx);
        for (let i = 0; i < this.appService.polynomialRatioGx; i++) {
          this.appService.polynomialBinaryScopeHGx.unshift('0');
        }
        while (this.appService.polynomialBinaryScopeHGx[this.appService.polynomialBinaryScopeHGx.length - 1] === '0') {
          this.appService.polynomialBinaryScopeHGx.pop();
        }
        this.polynomialHGxbeforeTacts = this.copy(this.appService.polynomialBinaryScopeHGx);
        this.getFinalPolynomialBeforeTacts();
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
      this.warningHx = false;
      this.warningGx = false;
      this.wrongPolynomial = false;
    } else {
      console.log('nie przeszlo');
      this.wrongPolynomial = true;
    }
    this.appService.calculationDone = true;
    this.checkPolynomialRatioForHTML();
    this.resetPolynomialFlipFlops();
    this.checkPolynomialFlipFlops();
  }

    getFinalPolynomialBeforeTacts() {
    this.finalPolynomialBeforeTacts = "";
    let lastElement = this.polynomialHGxbeforeTacts.length - 1;
    for (let i = lastElement; i >= 0; i--) {
      if (this.polynomialHGxbeforeTacts[i] === '1') {
        if (i === 1) {
          this.finalPolynomialBeforeTacts += 'x+';
        } else if (i === 0) {
          this.finalPolynomialBeforeTacts += '1';
        } else {
          this.finalPolynomialBeforeTacts += `x^${i}+`;
        }
      }
    }
    this.finalPolynomialBeforeTacts = this.finalPolynomialBeforeTacts.slice(0,this.finalPolynomialBeforeTacts.length - 1);
  }

  checkPolynomialRatioForHTML() {
    switch (this.appService.polynomialGx) {
      case (6): {
        this.appService.htmlRatioThree = true;
        this.appService.htmlRatioFour = true;
        this.appService.htmlRatioFive = true;
        this.appService.htmlRatioSix = true;
        break;
      }
      case (5): {
        this.appService.htmlRatioThree = true;
        this.appService.htmlRatioFour = true;
        this.appService.htmlRatioFive = true;
        this.appService.htmlRatioSix = false;
        break;
      }
      case (4): {
        this.appService.htmlRatioThree = true;
        this.appService.htmlRatioFour = true;
        this.appService.htmlRatioFive = false;
        this.appService.htmlRatioSix = false;
        break;
      }
      case (3): {
        this.appService.htmlRatioThree = true;
        this.appService.htmlRatioFour = false;
        this.appService.htmlRatioFive = false;
        this.appService.htmlRatioSix = false;
        break;
      }
      case (2): {
        this.appService.htmlRatioThree = false;
        this.appService.htmlRatioFour = false;
        this.appService.htmlRatioFive = false;
        this.appService.htmlRatioSix = false;
        break;
      }
      default: {
        this.appService.htmlRatioThree = false;
        this.appService.htmlRatioFour = false;
        this.appService.htmlRatioFive = false;
        this.appService.htmlRatioSix = false;
        break;
      }
    }
  }

  checkPolynomialFlipFlops() {
    if (this.appService.polynomialGx > 2) {
      console.log('jest ponad 2')
      if (this.appService.selectedBinaryScopeGx[1] === '1') {
        this.appService.htmlFlipFlopThree = true;
        console.log('3 true',this.appService.selectedBinaryScopeGx[1] )
      }
    }
    if (this.appService.polynomialGx > 3) {
      console.log('jest ponad 3')
      if (this.appService.selectedBinaryScopeGx[2] === '1') {
        this.appService.htmlFlipFlopFour = true;
        console.log('4 true',this.appService.selectedBinaryScopeGx[1] )
      }
    }
    if (this.appService.polynomialGx > 4) {
      console.log('jest ponad 4')
      if (this.appService.selectedBinaryScopeGx[3] === '1') {
        this.appService.htmlFlipFlopFive = true;
        console.log('5 true',this.appService.selectedBinaryScopeGx[1] )
      }
    }
    if (this.appService.polynomialGx > 5) {
      console.log('jest ponad 5')
      if (this.appService.selectedBinaryScopeGx[4] === '1') {
        this.appService.htmlFlipFlopSix = true;
        console.log('6 true',this.appService.selectedBinaryScopeGx[1] )
      }
    }
    console.log(this.appService.htmlFlipFlopThree,  this.appService.htmlFlipFlopFour,  this.appService.htmlFlipFlopFive, this.appService.htmlFlipFlopSix);
  }

  resetPolynomialFlipFlops() {
    this.appService.htmlFlipFlopThree = false;
    this.appService.htmlFlipFlopFour = false;
    this.appService.htmlFlipFlopFive = false;
    this.appService.htmlFlipFlopSix = false;
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
    this.resetPolynomialFlipFlops();
  }

  resetHx() {
    this.appService.polynomialHx = 0;
    this.appService.polynomialHxRange = [];
    this.appService.selectedBinaryScopeHx = [];
    this.inputHx = null;
  }

  resetGx() {
    this.appService.polynomialGx = 0;
    this.appService.polynomialGxRange = [];
    this.appService.selectedBinaryScopeGx = [];
    this.inputGx = null
  }

  checkInput(input) {
    if (input === null || input === undefined || input === '') {
      return false;
    } else {
      return true;
    }
  }

  checkRange(currentMax, maxRange, minRange) {
    if (currentMax > maxRange) {
      console.log('przekroczone MAX')
      return false;
    } else if (currentMax < minRange) {
      console.log('ponizej MAX')
      return false;
    } else {
      console.log('pomiedzy max i min')
      return true;
    }
  }

  updateVariablesHx() {
    if (this.checkInput(this.inputHx) === false) {
      this.warningHx = true;
    }
    this.newHxValue = this.getBinarryNotation(this.inputHx, this.maxHxRange, this.minHxRange);
    if (this.newHxValue !== undefined && this.newHxValue !== null) {
      this.appService.selectedBinaryScopeHx = this.newHxValue;
      this.appService.polynomialHx = this.max + 1;
      this.appService.polynomialHxRange = [];
      for (let i = 0; i <= this.max; i++) {
        this.appService.polynomialHxRange.push(i);
      }
      this.warningHx = false;
    } else {
      this.resetHx();
      this.warningHx = true;
    }
  }

  updateVariablesGx() {
    if (this.checkInput(this.inputGx) === false) {
      this.warningGx = true;
    }
    this.newGxValue = this.getBinarryNotation(this.inputGx, this.maxGxRange, this.minGxRange);
    if (this.newGxValue !== undefined && this.newGxValue !== null) {
      this.appService.selectedBinaryScopeGx = this.newGxValue;
      this.appService.polynomialGx = this.max + 1;
      this.appService.polynomialGxRange = [];
      for (let i = 0; i <= this.max; i++) {
        this.appService.polynomialGxRange.push(i);
      }
      this.warningGx = false;
    } else {
      this.resetGx();
      this.warningGx = true;
    }
  }

  getCoef(str) {
    console.log('STR', str);
    if (str === undefined || str === null || str === "") {
      console.log('STR jest null albo undefined')
    } else {
      str = str.replace(/\s+/g, "");                   // remove spaces (optional)
      let parts = str.match(/[+\-]?[^+\-]+/g);         // get the parts: see explanation bellow
      // accumulate the results
      return parts.reduce(function (res, part) {        // for each part in parts
        let coef = parseFloat(part) || +(part[0] + "1") || 1;// the coeficient is the number at the begining of each part (34x => 34), if there is no number it is assumed to be +/-1 depending on the sign (+x^2 => +1)
        let x = part.indexOf('x');                     // the index of "x" in this part (could be -1 if there isn't)
        // calculating the power of this part
        let power = x === -1 ?                         // if the index of "x" is -1 (there is no "x")
          0 :                                          // then the power is 0 (Ex: -2)
          part[x + 1] === "^" ?                        // otherwise (if there is an "x"), then check if the char right after "x" is "^", if so...
            +part.slice(x + 2) :                       // then the power is the number right after it (Ex: 55x^30)
            1;                                         // otherwise it's 1 (Ex: 55x)
        if (res[power]) {                              // if we already encountered this power in other parts before
          res[power] += coef;                          // then add this coeficient to the sum of those previous coeficients
        } else {                                       // otherwise
          res[power] = coef;                           // start a new sum initialized with this coeficient
        }
        console.log(res)
        return res;
      }, {});
    }
  }

  getBinarryNotation(polynomial, maxRange, minRange) {
    let ret = this.getCoef(polynomial);                // getCoef result and save to variable
    // let ret = { "3": 7, "0": 19 };                  // the returned object
    console.log('this.getCoef(polynomial', ret);
    if (ret !== undefined && ret !== null) {
      let powers = Object.keys(ret);                     // get all the powers (in this case [3, 0])
      console.log('powers', powers);
      this.max = Math.max.apply(null, powers);         // get the max power from powers array (in this case 3)
      console.log('max', this.max);
      this.result = [];

      for (let i = this.max; i >= 0; i--) {                   // from the max power to 0
        this.result.push((ret[i] || 0).toString());      // if that power has a coeficient then push it, otherwise push 0
      }
      for (let i = this.max; i >= 0; i--) {
        if (this.result[i] > 1) {
          this.result[i] = '1';
        }
      }
      this.result.reverse();
      console.log('result:', this.result, 'MAX:', this.max, 'maxRange', maxRange, 'minRange', minRange)

      if (this.checkRange(this.max, maxRange, minRange) === false) {
        if (polynomial === this.inputHx) {
          this.warningHx = true;
          this.resetHx();
        } else if (polynomial === this.inputGx) {
          this.warningGx = true;
          this.resetGx();
        }
        this.result = undefined;
      }

      return this.result;
    }
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
