import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@mdv13/core-data';
import { TasksFacade } from '@mdv13/core-state';

@Component({
  selector: 'mdv13-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss']
})
export class ClockComponent implements OnInit {

  tasks$: Observable<Task[]>;
  task$: Observable<Task>;

  constructor(private tasksFacade: TasksFacade) { }

  ngOnInit() {
    this.tasks$ = this.tasksFacade.allTasks$;
    this.task$ = this.tasksFacade.selectedTask$;
    this.tasksFacade.loadTasks();
  }

  selectTask(taskId: number) {
    this.tasksFacade.selectTask(taskId);
  }

  createTask(entity: Task) {
    this.tasksFacade.createTask(entity);
  }

}
