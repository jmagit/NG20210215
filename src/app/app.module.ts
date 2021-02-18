import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainModule } from './main';
import { AubayCoreModule, ERROR_LEVEL, LoggerService } from 'src/aubay-core';
import { environment } from 'src/environments/environment';
import { CommonServicesModule } from './common-services';
import { DemosComponent } from './demos/demos.component';
import { HomeComponent } from './home/home.component';
import { DinamicoComponent } from './dinamico/dinamico.component';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    HomeComponent,
    DinamicoComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    AppRoutingModule, AubayCoreModule, MainModule, CommonServicesModule
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
