import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoderComponent } from './coder/coder.component';
import { GraphComponent } from './graph/graph.component';

import { AppService } from './services/app.service';
import { TactsService } from './services/tacts.service';
import { GraphRangeSixComponent } from './graph-range-six/graph-range-six.component';

let appRoutes = [
  { path: 'coder', component: CoderComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'graphRangeSix', component: GraphRangeSixComponent },
  { path: '', component: CoderComponent },
];

const routes: Routes = appRoutes;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoderComponent,
    GraphComponent,
    GraphRangeSixComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [
    AppService,
    TactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
