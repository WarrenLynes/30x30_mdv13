import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '@mdv13/material';
import { LoadingComponent } from './loading/loading.component';
import { TimerComponent } from './timer/timer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';

@NgModule({
  imports: [MaterialModule, CommonModule],
  declarations: [LoginComponent, LoadingComponent, TimerComponent, NotFoundComponent, TaskListComponent, TaskFormComponent ],
  exports: [LoginComponent, LoadingComponent, TimerComponent, NotFoundComponent, TaskListComponent, TaskFormComponent]
})
export class UiModule {}
