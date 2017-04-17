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
  private P: any = [0, 0];
  private output = 0;
  private oldOutput;

  private iteration: number = 1;

  constructor(
    private tactsService: TactsService,
    private appService: AppService
  ) { }

  nextTact() {
    this.test();
    if (this.tactsService.tactActive <= this.tactsService.tacts) {
      this.tactsService.tactActive++;
      this.oldOutput = this.output;

      let array = this.appService.polynomialBinaryScopeHGx;
      this.P[1] = parseInt(this.P[0]);
      this.P[0] = parseInt(this.appService.input);
      this.output = parseInt(this.P[1]);

      let diff = this.appService.polynomialRatioGx + 2;

      if (diff <= this.tactsService.tactActive) {
        let sum = parseInt(this.oldOutput) + parseInt(this.appService.input);
        if (sum > 1) {
          this.P[0] = 0;
        } else if (sum == 1) {
          this.P[0] = 1;
        } else {
          this.P[0] = 0;
        }
      }

      this.appService.input = parseInt(array[array.length - this.iteration]);

      if (isNaN(this.appService.input)) {
        this.appService.input = "";
      }
      console.log('---------------------------');
      console.log('input:', this.appService.input);
      console.log('p0:', this.P[0]);
      console.log('p1:', this.P[1]);
      console.log('output:', this.output);
      console.log('oldOutput:', this.oldOutput);
      console.log('this.tactsService.tactActive:',this.tactsService.tactActive);
      console.log('this.tactsService.tacts',this.tactsService.tacts);
      console.log('HGx:', this.appService.polynomialRatioGx);

      console.log('TYPEOF input:', typeof(this.appService.input), 'p0:', typeof(this.P[0]), 'p1:', typeof(this.P[1]), 'output:', typeof(this.output), 'this.tactsService.tactActive:', typeof(this.tactsService.tactActive), 'this.tactsService.tacts', typeof(this.tactsService.tacts),'HGx:', typeof(this.appService.polynomialRatioGx));

      // console.log('last element: ', array[array.length - this.iteration], 'length of HGx: ', array.length, 'tact: ', this.tactsService.tacts, 'this.tactsService.tactActive: ', this.tactsService.tactActive);
      this.iteration++;
    }

    if (this.tactsService.tactActive > this.tactsService.tacts) {
      this.buttonDisabled = true;
    }
  }

  test() {
    if (this.appService.selectedBinaryScopeGx[1] === "1") {
      console.log('jest na drugiej pozycji')
    }
  }

  ngOnInit() {
  }

}
