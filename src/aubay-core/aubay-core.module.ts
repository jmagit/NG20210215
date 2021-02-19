import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizerComponent } from './components/aubay-sizer.component';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';
import { MIS_VALIDADORES } from './directives/validaciones.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SizerComponent, PIPES_CADENAS, MIS_VALIDADORES, ],
  exports: [SizerComponent, PIPES_CADENAS, MIS_VALIDADORES, ],
})
export class AubayCoreModule { }
