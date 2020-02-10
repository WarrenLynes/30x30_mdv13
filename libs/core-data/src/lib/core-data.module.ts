import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { TasksService } from './tasks/tasks.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthService, TasksService],
})
export class CoreDataModule {}
