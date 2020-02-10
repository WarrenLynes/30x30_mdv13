import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '@mdv13/core-data';

@Component({
  selector: 'mdv13-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() tasks: Task[];
  @Input() selected: Task;
  @Output() selectt = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  selectTask(task) {
    this.selectt.emit(task.id)
  }

}
