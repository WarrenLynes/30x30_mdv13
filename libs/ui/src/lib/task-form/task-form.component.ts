import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@mdv13/core-data';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'mdv13-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  taskForm: FormGroup;
  time = 0;
  @Input() task: Task;
  @Output() saveTask = new EventEmitter<Task>();
  constructor() {
    this.buildForm();
  }

  ngOnInit() {
  }

  updateTime(update: number) {
    this.time += update;
    this.taskForm.controls.time.setValue(this.time);
  }

  buildForm() {
    this.taskForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      time: new FormControl(0),
      estimate: new FormControl(0)
    })
  }

  save() {
    this.saveTask.emit(this.taskForm.value);
  }

}
