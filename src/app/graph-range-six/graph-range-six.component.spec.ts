import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphRangeSixComponent } from './graph-range-six.component';

describe('GraphRangeSixComponent', () => {
  let component: GraphRangeSixComponent;
  let fixture: ComponentFixture<GraphRangeSixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphRangeSixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphRangeSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
