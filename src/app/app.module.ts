import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AjaxWaitInterceptor, MainModule } from './main';
import { AubayCoreModule, ERROR_LEVEL, LoggerService } from 'src/aubay-core';
import { environment } from 'src/environments/environment';
import { CommonServicesModule } from './common-services';
import { DemosComponent } from './demos/demos.component';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PersonasModule, PersonasViewModelMockService, PersonasViewModelService } from './personas';
import { BlogModule } from './blog';

@NgModule({
  declarations: [
    AppComponent,
    DemosComponent,
    DinamicoComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    AppRoutingModule, AubayCoreModule, MainModule, CommonServicesModule,
    PersonasModule, BlogModule
  ],
  providers: [
    LoggerService,
    { provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    PersonasViewModelService,
    // { provide: PersonasViewModelService, useClass: PersonasViewModelMockService },
    { provide: HTTP_INTERCEPTORS, useClass: AjaxWaitInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
