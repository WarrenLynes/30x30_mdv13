import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '@mdv13/core-data';
import { TasksFacade } from '@mdv13/core-state';
import { tap } from 'rxjs/operators';

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
    this.tasks$ = this.tasksFacade.allTasks$.pipe(
      tap((x) => console.log(x))
    );
    this.task$ = this.tasksFacade.selectedTask$.pipe(
      tap((x) => console.log(x))
    );
    this.tasksFacade.loadTasks();
  }

  selectTask(taskId: number) {
    this.tasksFacade.selectTask(taskId);
  }

  saveTask(entity: Task) {
    if(entity.id) {
      this.tasksFacade.updateTask(entity);
    } else {
      this.tasksFacade.createTask(entity);
    }
    this.tasksFacade.selectTask(null);
  }
  deleteTask(task: Task) {
    this.tasksFacade.deleteTask(task);
    this.tasksFacade.selectTask(null);
  }
}
