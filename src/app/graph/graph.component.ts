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
  private P: any = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  private output = 0;
  private oldOutput;

  private iteration: number = 1;
  private sequencex1: any;
  private sequencex2: any;
  private sequencex3: any;
  private sequencex4: any;

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

      //DLA 2 STOPNIA g(x) czyli x^1
      if (this.appService.polynomialRatioGx === 1) {
        console.log('RATIO 1');
        let sequence1 = "11"
        this.P[0] = parseInt(this.appService.input);
        switch (sequence1) {
          case "11":
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
            this.output = this.P[1];
            break;
          case "101":
            console.log('case 101');
            if (diff < this.tactsService.tactActive) {
              let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.P[1] = parseInt(this.P[0]);
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
            this.output = this.P[1];
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
              let sum1 = parseInt(this.oldOutput) + this.P[0];
              let sum2 = parseInt(this.oldOutput) + this.P[1];
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
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[2];
            break;
          case "1011":
            console.log('case 1011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.P[0];
              this.P[2] = parseInt(this.P[1]);
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
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[2];
            break;
          case "1101":
            console.log('case 1101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.P[1];
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
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[2];
            break;
          case "1001":
            console.log('case 1001');
            if (diff < this.tactsService.tactActive) {
              let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              if (sum > 1) {
                this.P[0] = 0;
              } else if (sum == 1) {
                this.P[0] = 1;
              } else {
                this.P[0] = 0;
              }
            } else {
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[2];
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
              let sum1 = parseInt(this.oldOutput) + this.P[0];
              let sum2 = parseInt(this.oldOutput) + this.P[1];
              let sum3 = parseInt(this.oldOutput) + this.P[2];
              if (sum3 > 1) {
                this.P[3] = 0;
              } else if (sum3 == 1) {
                this.P[3] = 1;
              } else {
                this.P[3] = 0;
              }
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
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "11101":
            console.log('case 11101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.P[1];
              let sum3 = parseInt(this.oldOutput) + this.P[2];
              if (sum3 > 1) {
                this.P[3] = 0;
              } else if (sum3 == 1) {
                this.P[3] = 1;
              } else {
                this.P[3] = 0;
              }
              if (sum2 > 1) {
                this.P[2] = 0;
              } else if (sum2 == 1) {
                this.P[2] = 1;
              } else {
                this.P[2] = 0;
              }

              this.P[1] = this.P[0];

              if (sum0 > 1) {
                this.P[0] = 0;
              } else if (sum0 == 1) {
                this.P[0] = 1;
              } else {
                this.P[0] = 0;
              }
            } else {
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "11011":
            console.log('case 11011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.P[0];
              let sum3 = parseInt(this.oldOutput) + this.P[2];
              if (sum3 > 1) {
                this.P[3] = 0;
              } else if (sum3 == 1) {
                this.P[3] = 1;
              } else {
                this.P[3] = 0;
              }
              this.P[2] = this.P[1];
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
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "10111":
            console.log('case 10111');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.P[0];
              let sum2 = parseInt(this.oldOutput) + this.P[1];
              this.P[3] = this.P[2];
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
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "11001":
            console.log('case 11001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum3 = parseInt(this.oldOutput) + this.P[2];
              if (sum3 > 1) {
                this.P[3] = 0;
              } else if (sum3 == 1) {
                this.P[3] = 1;
              } else {
                this.P[3] = 0;
              }
              this.P[2] = this.P[1];
              this.P[1] = parseInt(this.P[0]);
              if (sum0 > 1) {
                this.P[0] = 0;
              } else if (sum0 == 1) {
                this.P[0] = 1;
              } else {
                this.P[0] = 0;
              }
            } else {
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "10101":
            console.log('case 10101');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum2 = parseInt(this.oldOutput) + this.P[1];
              this.P[3] = this.P[2];
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
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "10011":
            console.log('case 10011');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              let sum1 = parseInt(this.oldOutput) + this.P[1];
              this.P[3] = this.P[2];
              this.P[2] = this.P[1];
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
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
          case "10001":
            console.log('case 10001');
            if (diff < this.tactsService.tactActive) {
              let sum0 = parseInt(this.oldOutput) + parseInt(this.appService.input);
              this.P[3] = this.P[2];
              this.P[2] = this.P[1];
              this.P[1] = this.P[0];
              if (sum0 > 1) {
                this.P[0] = 0;
              } else if (sum0 == 1) {
                this.P[0] = 1;
              } else {
                this.P[0] = 0;
              }
            } else {
              this.P[3] = parseInt(this.P[2]);
              this.P[2] = parseInt(this.P[1]);
              this.P[1] = parseInt(this.P[0]);
              this.P[0] = parseInt(this.appService.input);
            }
            this.output = this.P[3];
            break;
        }
      }
      ///////////////////////////

      this.appService.input = parseInt(array[array.length - this.iteration]);
      this.checkNan();
      this.iteration++;
    }

    this.disableButton();
    this.logInfo();

    if (this.tactsService.tactActive > this.tactsService.tacts) {
      this.setRest();
      this.clearOutput();
      this.visibility = true;
    }
  }

  setRest() {
    this.appService.polynomialBinaryScopeCx = this.appService.polynomialBinaryScopeHGx;
    for (let i = 1; i <= 10; i++) {
      if (this.appService.polynomialRatioGx === i) {
        this.appService.polynomialBinaryScopeCx.splice(0, i);
        let j = i - 1;
        console.log(j)
        while (j < i && j >= 0) {
          console.log(this.P[j])
          this.appService.polynomialBinaryScopeCx.unshift(this.P[j].toString());
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
    delete this.output;
  }

  logInfo() {
    console.log('---------------------------');
    console.log('input:', this.appService.input);
    console.log('p0:', this.P[0]);
    console.log('p1:', this.P[1]);
    console.log('p2:', this.P[2]);
    console.log('output:', this.output);
    console.log('oldOutput:', this.oldOutput);
    console.log('this.tactsService.tactActive:', this.tactsService.tactActive);
    console.log('this.tactsService.tacts', this.tactsService.tacts);
    console.log('HGx:', this.appService.polynomialRatioGx);
    console.log('TYPEOF input:', typeof (this.appService.input), 'p0:', typeof (this.P[0]), 'p1:', typeof (this.P[1]), 'output:', typeof (this.output), 'this.tactsService.tactActive:', typeof (this.tactsService.tactActive), 'this.tactsService.tacts', typeof (this.tactsService.tacts), 'HGx:', typeof (this.appService.polynomialRatioGx));
  }

  ngOnInit() {
    // this.appService.updateTitle('Graph');
    this.appService.pageCode = false;
    this.appService.pageGraph = true;
  }

}
