import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main';
import { AubayCoreModule, ERROR_LEVEL, LoggerService } from 'src/aubay-core';
import { CommonAppModule } from './common-app/common-app.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, AubayCoreModule, MainModule, CommonAppModule
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
