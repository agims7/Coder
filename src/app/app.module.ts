import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CoderComponent } from './coder/coder.component';

let appRoutes = [
  { path: 'coder', component: CoderComponent },
  { path: '', component: CoderComponent },
];

const routes: Routes = appRoutes;

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CoderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
