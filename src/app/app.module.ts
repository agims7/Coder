import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoderComponent } from './coder/coder.component';
import { GraphComponent } from './graph/graph.component';

import { TactsService } from './services/tacts.service';

let appRoutes = [
  { path: 'coder', component: CoderComponent },
  { path: 'graph', component: GraphComponent },
  { path: '', component: CoderComponent },
];

const routes: Routes = appRoutes;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoderComponent,
    GraphComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [
    TactsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
