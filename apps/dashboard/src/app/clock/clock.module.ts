import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClockComponent } from './clock.component';
import { UiModule } from '@mdv13/ui';

@NgModule({
  declarations: [ClockComponent],
  imports: [
    UiModule,
    CommonModule,
    RouterModule.forChild([
      {path: '', component: ClockComponent}
    ])
  ]
})
export class ClockModule { }
