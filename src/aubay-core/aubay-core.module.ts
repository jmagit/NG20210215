import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizerComponent } from './components/aubay-sizer.component';
import { PIPES_CADENAS } from './pipes/cadenas.pipe';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SizerComponent, PIPES_CADENAS, ],
  exports: [SizerComponent, PIPES_CADENAS, ],
})
export class AubayCoreModule { }
