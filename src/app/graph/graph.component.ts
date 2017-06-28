import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  private visibility: boolean = false;
  private buttonDisabled = false;
  private oldOutput;
  private iteration: number = 1;
  private sequencex1: any;
  private sequencex2: any;
  private sequencex3: any;
  private sequencex4: any;
  private sequencex5: any;

  constructor(
    private tactsService: TactsService,
    private appService: AppService
  ) { }

  copy(o) {
    let output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
      v = o[key];
      output[key] = (typeof v === "object") ? this.copy(v) : v;
    }
    return output;
  }

  setSeq5() {
    this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
    this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
    this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
    this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
    this.tactsService.P[0] = parseInt(this.appService.input);
  }

  setSeq4() {
    this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
    this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
    this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
    this.tactsService.P[0] = parseInt(this.appService.input);
  }

  setSeq3() {
    this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
    this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
    this.tactsService.P[0] = parseInt(this.appService.input);
  }

  setSeq2() {
    this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
    this.tactsService.P[0] = parseInt(this.appService.input);
  }


  checkSum(sum, i) {
    if (sum > 1) {
      this.tactsService.P[i] = 0;
    } else if (sum == 1) {
      this.tactsService.P[i] = 1;
    } else { this.tactsService.P[i] = 0; }
  }

  calculateForInit() {
    let allTacts = this.appService.polynomialGx + this.appService.polynomialHx;
    for (let i = 0; i < allTacts; i++) {
      this.nextTact();
    }
    let finalArray = this.appService.polynomialBinaryScopeCx.reverse();
    this.tactsService.outputCoderFull = this.copy(finalArray);
    this.resetAfterCalculation();
    this.setinputScopeForGraph();
  }

  calculateAll() {
    let allTacts = this.appService.polynomialGx + this.appService.polynomialHx;
    for (let i = 0; i < allTacts; i++) {
      this.nextTact();
    }
  }

  resetAfterCalculation() {
    this.iteration = 1;
    this.visibility = false;
    this.buttonDisabled = false;
    this.oldOutput = 0;
    this.appService.input = 0;
    this.tactsService.tactActive = 0
    this.tactsService.P = [0, 0, 0, 0, 0];
    this.tactsService.output = 0;
    this.tactsService.switch = false;
    this.tactsService.finalCxforListing = [];
    this.tactsService.oldP = [0, 0, 0, 0, 0];
    this.tactsService.oldOutput = 0;
    this.appService.oldInput = 0;

    for (let i = 0; i < this.appService.polynomialRatioGx; i++) {
      this.appService.polynomialBinaryScopeHGx[i] = '0';
    }
  }

  nextTact() {
    for (let i = 0; i < this.tactsService.P.length; i++) {
      this.tactsService.oldP[i] = this.tactsService.P[i]
    }
    this.tactsService.oldOutput = this.tactsService.output;
    this.appService.oldInput = this.appService.input;

    if (this.tactsService.outputCoderFull) {
      this.tactsService.outputCoder = this.tactsService.outputCoderFull[this.iteration - 1];
    }
    if (this.tactsService.tactActive <= this.tactsService.tacts) {
      this.tactsService.tactActive++;
      this.oldOutput = this.tactsService.output;

      let array = this.appService.polynomialBinaryScopeHGx;
      let diff = this.appService.polynomialRatioGx + 1;

      //DLA 2 STOPNIA g(x) czyli x^1
      if (this.appService.polynomialRatioGx === 1) {
        console.log('RATIO 1');
        let sequence1 = "11"
        this.tactsService.P[0] = parseInt(this.appService.input);
        switch (sequence1) {
          case "11":
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.checkSum(sum0, 0);;
            }
            this.tactsService.output = this.tactsService.P[0];
            break;
        }
      }
      ///////////////////////

      //DLA 3 STOPNIA g(x) czyli x^2
      if (this.appService.polynomialRatioGx === 2) {
        console.log('RATIO 2');
        if (this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex2 = "111"
        } else {
          this.sequencex2 = "101"
        }

        switch (this.sequencex2) {
          case "111":
            console.log('case 111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq2();
            }
            this.tactsService.output = this.tactsService.P[1];
            break;
          case "101":
            console.log('case 101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq2();
            }
            this.tactsService.output = this.tactsService.P[1];
            break;
        }
      }
      ///////////////////////////

      //DLA 4 STOPNIA g(x) czyli x^3
      if (this.appService.polynomialRatioGx === 3) {
        console.log('RATIO 3');
        if (this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex3 = "1111"
        } else if (this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex3 = "1101"
        } else if (this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex3 = "1011"
        } else {
          this.sequencex3 = "1001"
        }

        switch (this.sequencex3) {
          case "1111":
            console.log('case 1111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq3();
            }
            this.tactsService.output = this.tactsService.P[2];
            break;
          case "1011":
            console.log('case 1011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq3();
            }
            this.tactsService.output = this.tactsService.P[2];
            break;
          case "1101":
            console.log('case 1101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq3();
            }
            this.tactsService.output = this.tactsService.P[2];
            break;
          case "1001":
            console.log('case 1001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq3();
            }
            this.tactsService.output = this.tactsService.P[2];
            break;
        }
      }
      ///////////////////////////

      //DLA 5 STOPNIA g(x) czyli x^4
      if (this.appService.polynomialRatioGx === 4) {
        console.log('RATIO 4');
        if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex4 = "11111"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex4 = "11101"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex4 = "11011"
        } else if (this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex4 = "10111"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1') {
          this.sequencex4 = "11001"
        } else if (this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex4 = "10101"
        } else if (this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex4 = "10011"
        } else {
          this.sequencex4 = "10001"
        }

        switch (this.sequencex4) {
          case "11111":
            console.log('case 11111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "11101":
            console.log('case 11101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);

              this.tactsService.P[1] = this.tactsService.P[0];

              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "11011":
            console.log('case 11011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = this.tactsService.P[1];
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "10111":
            console.log('case 10111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.tactsService.P[3] = this.tactsService.P[2];
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "11001":
            console.log('case 11001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = this.tactsService.P[1];
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "10101":
            console.log('case 10101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.tactsService.P[3] = this.tactsService.P[2];
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "10011":
            console.log('case 10011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.tactsService.P[3] = this.tactsService.P[2];
              this.tactsService.P[2] = this.tactsService.P[1];
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
          case "10001":
            console.log('case 10001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.tactsService.P[3] = this.tactsService.P[2];
              this.tactsService.P[2] = this.tactsService.P[1];
              this.tactsService.P[1] = this.tactsService.P[0];
              this.checkSum(sum0, 0);
            } else {
              this.setSeq4();
            }
            this.tactsService.output = this.tactsService.P[3];
            break;
        }
      }
      ///////////////////////////

      //DLA 6 STOPNIA g(x) czyli x^5
      if (this.appService.polynomialRatioGx === 5) {
        console.log('RATIO 5');
        if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "111111"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex5 = "111101"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "111011"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[3] === '1') {
          this.sequencex5 = "111001"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "110111"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex5 = "110101"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "110011"
        } else if (this.appService.selectedBinaryScopeGx[4] === '1') {
          this.sequencex5 = "110001"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "101111"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex5 = "101101"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "101011"
        } else if (this.appService.selectedBinaryScopeGx[3] === '1') {
          this.sequencex5 = "101001"
        } else if (this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "100111"
        } else if (this.appService.selectedBinaryScopeGx[2] === '1') {
          this.sequencex5 = "100101"
        } else if (this.appService.selectedBinaryScopeGx[1] === '1') {
          this.sequencex5 = "100011"
        } else {
          this.sequencex5 = "100001"
        }

        switch (this.sequencex5) {
          case "111111":
            console.log('case 111111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "111101":
            console.log('case 111101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "111011":
            console.log('case 111011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "111001":
            console.log('case 111001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "110111":
            console.log('case 110111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "110101":
            console.log('case 110101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];

            break;
          case "110011":
            console.log('case 110011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "110001":
            console.log('case 110001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum4 = parseInt(this.oldOutput) + this.tactsService.P[3];
              this.checkSum(sum4, 4);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "101111":
            console.log('case 101111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "101101":
            console.log('case 101101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.checkSum(sum3, 3);
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "101011":
            console.log('case 101011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "101001":
            console.log('case 101001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum3 = parseInt(this.oldOutput) + this.tactsService.P[2];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.checkSum(sum3, 3);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "100111":
            console.log('case 100111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.checkSum(sum2, 2);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "100101":
            console.log('case 100101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.tactsService.P[1];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.checkSum(sum2, 2);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "100011":
            console.log('case 100011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.tactsService.P[0];
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.checkSum(sum1, 1);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
          case "100001":
            console.log('case 100001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.tactsService.P[4] = parseInt(this.tactsService.P[3]);
              this.tactsService.P[3] = parseInt(this.tactsService.P[2]);
              this.tactsService.P[2] = parseInt(this.tactsService.P[1]);
              this.tactsService.P[1] = parseInt(this.tactsService.P[0]);
              this.checkSum(sum0, 0);
            } else {
              this.setSeq5();
            }
            this.tactsService.output = this.tactsService.P[4];
            break;
        }
      }
      ///////////////////////////

      this.appService.input = parseInt(array[array.length - this.iteration]);
      this.checkNan();
      this.iteration++;

      this.tactsService.finalCxforListing.push(this.tactsService.outputCoder);
      console.log('this.tactsService.finalCxforListing', this.tactsService.finalCxforListing)

    }

    if (this.appService.inputScopeForGraph) {
      this.appService.inputScopeForGraph.shift();
      if (this.appService.inputScopeForGraph.length === 0) {
        this.appService.inputScopeForGraph.push('0');
      }
    }


    this.disableButton();

    if (this.tactsService.tactActive === this.appService.polynomialHx) {
      this.tactsService.switch = true;
    }

    if (this.tactsService.tactActive > this.tactsService.tacts) {
      this.setRest();
      this.clearOutput();
      this.getFinalPolynomial();
      this.visibility = true;
      this.appService.inputScopeForGraph = [];
      this.logInfo();
    }

    this.logInfo()
  }

  setinputScopeForGraph() {
    this.appService.inputScopeForGraph = [];
    this.appService.inputScopeForGraph = this.copy(this.appService.selectedBinaryScopeHx);
    this.appService.inputScopeForGraph.reverse();
  }

  getFinalPolynomial() {
    this.appService.finalPolynomial = "";
    let lastElement = this.appService.polynomialBinaryScopeHGx.length - 1;
    for (let i = lastElement; i >= 0; i--) {
      if (this.appService.polynomialBinaryScopeHGx[i] === '1') {
        if (i === 1) {
          this.appService.finalPolynomial += 'x+';
        } else if (i === 0) {
          this.appService.finalPolynomial += '1';
        } else {
          this.appService.finalPolynomial += `x^${i}+`;
        }
      }
    }
  }

  setRest() {
    this.appService.polynomialBinaryScopeCx = this.appService.polynomialBinaryScopeHGx;
    for (let i = 1; i <= 10; i++) {
      if (this.appService.polynomialRatioGx === i) {
        this.appService.polynomialBinaryScopeCx.splice(0, i);
        let j = i - 1;
        while (j < i && j >= 0) {
          this.appService.polynomialBinaryScopeCx.unshift(this.tactsService.P[j].toString());
          j--;
        }
      }
    }
  }

  checkNan() {
    if (isNaN(this.appService.input)) {
      this.appService.input = "";
    }
  }

  disableButton() {
    if (this.tactsService.tactActive > this.tactsService.tacts) {
      this.buttonDisabled = true;
    }
  }

  clearOutput() {
    delete this.tactsService.output;
  }

  setHGx() {
    this.appService.polynomialBinaryScopeHGx = null;
    this.appService.polynomialBinaryScopeHGx = this.copy(this.appService.selectedBinaryScopeHx);
    for (let i = 0; i < this.appService.polynomialRatioGx; i++) {
      this.appService.polynomialBinaryScopeHGx.unshift('0');
    }
    while (this.appService.polynomialBinaryScopeHGx[this.appService.polynomialBinaryScopeHGx.length - 1] === '0') {
      this.appService.polynomialBinaryScopeHGx.pop();
    }
  }

  logInfo() {
    console.log('---------------------------');
    console.log('input:', this.appService.input);
    console.log('p0:', this.tactsService.P[0]);
    console.log('p1:', this.tactsService.P[1]);
    console.log('p2:', this.tactsService.P[2]);
    console.log('p2:', this.tactsService.P[3]);
    console.log('p2:', this.tactsService.P[4]);
    console.log('output:', this.tactsService.output);
    console.log('oldOutput:', this.oldOutput);
    console.log('this.tactsService.tactActive:', this.tactsService.tactActive);
    console.log('this.tactsService.tacts', this.tactsService.tacts);
    console.log('HGx:', this.appService.polynomialRatioGx);
    console.log('this.appService.polynomialBinaryScopeCx: ', this.appService.polynomialBinaryScopeCx)
  }

  ngOnInit() {
    this.calculateForInit();
    this.setHGx();
    this.appService.pageCode = false;
    this.appService.pageGraph = true;
    this.logInfo();
  }

}
