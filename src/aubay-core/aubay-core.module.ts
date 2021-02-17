import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SizerComponent } from './components/aubay-sizer.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [SizerComponent, ],
  exports: [SizerComponent, ],
})
export class AubayCoreModule { }
