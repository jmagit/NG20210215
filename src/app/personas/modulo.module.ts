import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PERSONAS_COMPONENTES } from './componente.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AubayCoreModule } from 'src/aubay-core';
import { CommonServicesModule } from '../common-services';



@NgModule({
  declarations: [
    PERSONAS_COMPONENTES
  ],
  exports: [
    PERSONAS_COMPONENTES
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([]), AubayCoreModule, CommonServicesModule,
  ]
})
export class PersonasModule { }
