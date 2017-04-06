import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coder',
  templateUrl: './coder.component.html',
  styleUrls: ['./coder.component.less']
})
export class CoderComponent implements OnInit {
  private visibility = false;
  private binaryScope: string[] = ['0', '1'];
  private binaryRange= [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private selectedBinaryScope = ["0", "0", "0", "0", "0","0", "0", "0", "0", "0"];

  constructor() { }

  calculate() {
    this.selectedBinaryScope.reverse();
    this.visibility = true;
  }

  ngOnInit() {

  }

}
