import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less']
})
export class GraphComponent implements OnInit {

  constructor(
    private tactsService: TactsService
  ) { }

  nextTact() {
    if (this.tactsService.tactActive < this.tactsService.tacts) {
      this.tactsService.tactActive++;
      console.log(this.tactsService.tactActive);
    }
  }

  ngOnInit() {
  }

}
