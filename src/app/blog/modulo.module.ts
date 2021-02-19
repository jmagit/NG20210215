import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BLOG_COMPONENTES } from './componente.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {EditorModule} from 'primeng/editor';
import {InplaceModule} from 'primeng/inplace';
import { AubayCoreModule } from 'src/aubay-core';
import { CommonServicesModule } from '../common-services';

@NgModule({
  declarations: [
    BLOG_COMPONENTES
  ],
  exports: [
    BLOG_COMPONENTES
  ],
  imports: [
    CommonModule, FormsModule, RouterModule.forChild([]),
    AubayCoreModule, CommonServicesModule,
    EditorModule, InplaceModule,
  ]
})
export class BlogModule { }
