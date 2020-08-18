// ANGULAR DEPENDENCY
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// ROUTING MODULES
import { UiModulesRouting } from './ui-modules-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiModulesRouting,
  ],
  exports: [UiModulesRouting],
})
export class UiModule { }
