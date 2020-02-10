import { Injectable } from '@angular/core';
import { Action, select, Store, ActionsSubject } from '@ngrx/store';
import * as fromTasks from './tasks.reducer';
import * as tasksActions from './tasks.actions';
import {
  selectAllTasks,
  selectTask,
  selectTasksLoading
} from './tasks.selectors';
import { Task } from '@mdv13/core-data';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TasksFacade {
  allTasks$ = this.store.pipe(select(selectAllTasks));
  selectedTask$ = this.store.pipe(select(selectTask));
  taskLoading$ = this.store.pipe(select(selectTasksLoading));

  constructor(
    private store: Store<fromTasks.TasksPartialState>,
    private actions$: ActionsSubject
  ) {}

  selectTask(selectedTaskId: any) {
    this.dispatch(tasksActions.taskSelected({ selectedTaskId }));
  }

  loadTasks() {
    this.dispatch(tasksActions.loadTasks());
  }

  createTask(task: Task) {
    this.dispatch(tasksActions.createTask({ task }));
  }

  updateTask(task: Task) {
    this.dispatch(tasksActions.updateTask({ task }));
  }

  deleteTask(task: Task) {
    this.dispatch(tasksActions.deleteTask({ task }));
  }

  private dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
