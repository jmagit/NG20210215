import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main';
import { AubayCoreModule } from 'src/aubay-core';
import { CommonAppModule } from './common-app/common-app.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, AubayCoreModule, MainModule, CommonAppModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
