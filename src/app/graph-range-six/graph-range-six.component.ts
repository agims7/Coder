import { Component, OnInit } from '@angular/core';
import { TactsService } from '../services/tacts.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-graph-range-six',
  templateUrl: './graph-range-six.component.html',
  styleUrls: ['./graph-range-six.component.less']
})
export class GraphRangeSixComponent implements OnInit {

  constructor(
    private tactsService: TactsService,
    private appService: AppService
  ) { }

  ngOnInit() {

  }

}
