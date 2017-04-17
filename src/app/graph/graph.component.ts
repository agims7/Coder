import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {
  private buttonDisabled = false;
  private P: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private output = 0;
  private oldOutput;

  private iteration: number = 1;

  constructor(
    private tactsService: TactsService,
    private appService: AppService
  ) { }

  nextTact() {
    if (this.tactsService.tactActive <= this.tactsService.tacts) {
      this.tactsService.tactActive++;
      this.oldOutput = this.output;

      let array = this.appService.polynomialBinaryScopeHGx;
      let diff = this.appService.polynomialRatioGx + 1;
      console.log('diff', diff);

      //DLA 2 STOPNIA g(x) czyli x^1
      if (this.appService.polynomialRatioGx === 1) {
        console.log('RATIO 1');
        this.P[0] = parseInt(this.appService.input);
        if (diff < this.tactsService.tactActive) {
          let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
          if (sum > 1) {
            this.P[0] = 0;
          } else if (sum == 1) {
            this.P[0] = 1;
          } else {
            this.P[0] = 0;
          }
        }
        this.output = this.P[0];
      }
      ///////////////////////

      //DLA 3 STOPNIA g(x) czyli x^2
      if (this.appService.polynomialRatioGx === 2) {
        console.log('RATIO 2');
        this.P[1] = parseInt(this.P[0]);
        if (this.appService.selectedBinaryScopeGx[1] === '1') {
          if (diff < this.tactsService.tactActive) {
            let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
            let sum1 = parseInt(this.oldOutput) + this.P[0];
            if (sum1 > 1) {
              this.P[1] = 0;
            } else if (sum1 == 1) {
              this.P[1] = 1;
            } else {
              this.P[1] = 0;
            }
            if (sum0 > 1) {
              this.P[0] = 0;
            } else if (sum0 == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[0] = parseInt(this.appService.input);
          }
        } else {
          if (diff < this.tactsService.tactActive) {
            let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
            if (sum > 1) {
              this.P[0] = 0;
            } else if (sum == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[0] = parseInt(this.appService.input);
          }
        }

        this.output = this.P[1];
      }
      ///////////////////////////

      //DLA 4 STOPNIA g(x) czyli x^3
      if (this.appService.polynomialRatioGx === 3) {
        console.log('RATIO 3');
        this.P[2] = parseInt(this.P[1]);


        if (this.appService.selectedBinaryScopeGx[2] === '1' && this.appService.selectedBinaryScopeGx[1] === '1') {
          console.log('opcja gdzie 1111')
          if (diff < this.tactsService.tactActive) {
            console.log('opcja gdzie 1111 i po diff')
            let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
            let sum1 = parseInt(this.oldOutput) + this.P[0];
            let sum2 = parseInt(this.oldOutput) + this.P[1];
            console.log(sum0);
            console.log(sum2);
            console.log(sum2);
            if (sum2 > 1) {
              this.P[2] = 0;
            } else if (sum2 == 1) {
              this.P[2] = 1;
            } else {
              this.P[2] = 0;
            }
            if (sum1 > 1) {
              this.P[1] = 0;
            } else if (sum1 == 1) {
              this.P[1] = 1;
            } else {
              this.P[1] = 0;
            }
            if (sum0 > 1) {
              this.P[0] = 0;
            } else if (sum0 == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[1] = parseInt(this.P[0]);
            this.P[0] = parseInt(this.appService.input);
          }

        } else if (this.appService.selectedBinaryScopeGx[2] === '1') {
          console.log('opcja gdzie 1101')
          if (diff < this.tactsService.tactActive) {
            console.log('opcja gdzie 0100 i po diff')
            let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
            let sum2 = parseInt(this.oldOutput) + this.P[1];
            console.log(sum0);
            console.log(sum2);
            if (sum2 > 1) {
              this.P[2] = 0;
            } else if (sum2 == 1) {
              this.P[2] = 1;
            } else {
              this.P[2] = 0;
            }
            this.P[1] = parseInt(this.P[0]);
            if (sum0 > 1) {
              this.P[0] = 0;
            } else if (sum0 == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[1] = parseInt(this.P[0]);
            this.P[0] = parseInt(this.appService.input);
          }

        } else if (this.appService.selectedBinaryScopeGx[1] === '1') {
          console.log('opcja gdzie 1011')
          if (diff < this.tactsService.tactActive) {
            let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
            let sum1 = parseInt(this.oldOutput) + this.P[0];
            if (sum1 > 1) {
              this.P[1] = 0;
            } else if (sum1 == 1) {
              this.P[1] = 1;
            } else {
              this.P[1] = 0;
            }
            if (sum0 > 1) {
              this.P[0] = 0;
            } else if (sum0 == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[1] = parseInt(this.P[0]);
            this.P[0] = parseInt(this.appService.input);
          }
        } else {
          if (diff < this.tactsService.tactActive) {
            let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
            if (sum > 1) {
              this.P[0] = 0;
            } else if (sum == 1) {
              this.P[0] = 1;
            } else {
              this.P[0] = 0;
            }
          } else {
            this.P[1] = parseInt(this.P[0]);
            this.P[0] = parseInt(this.appService.input);
          }
        }

        this.output = this.P[2];
      }
      ///////////////////////////

      this.appService.input = parseInt(array[array.length - this.iteration]);
      this.checkNan();
      this.iteration++;
    }

    this.disableButton();
    this.logInfo();
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

  logInfo() {
    console.log('---------------------------');
    console.log('input:', this.appService.input);
    console.log('p0:', this.P[0]);
    console.log('p1:', this.P[1]);
    console.log('output:', this.output);
    console.log('oldOutput:', this.oldOutput);
    console.log('this.tactsService.tactActive:', this.tactsService.tactActive);
    console.log('this.tactsService.tacts', this.tactsService.tacts);
    console.log('HGx:', this.appService.polynomialRatioGx);
    console.log('TYPEOF input:', typeof (this.appService.input), 'p0:', typeof (this.P[0]), 'p1:', typeof (this.P[1]), 'output:', typeof (this.output), 'this.tactsService.tactActive:', typeof (this.tactsService.tactActive), 'this.tactsService.tacts', typeof (this.tactsService.tacts), 'HGx:', typeof (this.appService.polynomialRatioGx));
  }

  ngOnInit() {
  }

}
