import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { map, tap } from 'rxjs/operators';

import { TasksFacade } from './tasks.facade';
import * as tasksActions from './tasks.actions';
import { Task, TasksService, SnackbarService } from '@mdv13/core-data';
import { TasksPartialState } from './tasks.reducer';
import { AppFacade } from '../app/app.facade';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.dataPersistence.fetch(tasksActions.loadTasks, {
      run: (
        action: ReturnType<typeof tasksActions.loadTasks>,
        state: TasksPartialState
      ) => {
        this.appFacade.addLoad('[TASKS][LOAD]');
        return this.tasksService.all().pipe(
          tap(() => this.notifyService.openSnackBar('Successfully Loaded Task')),
          map((tasks: Task[]) => tasksActions.tasksLoaded({ tasks })),
          tap(() => this.appFacade.removeLoad('[TASKS][LOAD]'))
        );
      },
      onError: (action: ReturnType<typeof tasksActions.loadTasks>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  addTask$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(tasksActions.createTask, {
      run: (
        action: ReturnType<typeof tasksActions.createTask>,
        state: TasksPartialState
      ) => {
        this.appFacade.addLoad('[TASKS][CREATE]');

        return this.tasksService.create(action.task).pipe(
          map((task: Task) => tasksActions.taskCreated({ task })),
          tap(() => this.notifyService.openSnackBar('Successfully Added a Task')),
          tap(() => this.appFacade.removeLoad('[TASKS][CREATE]'))
        );
      },
      onError: (action: ReturnType<typeof tasksActions.createTask>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  updateTask$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(tasksActions.updateTask, {
      run: (
        action: ReturnType<typeof tasksActions.updateTask>,
        state: TasksPartialState
      ) => {
        this.appFacade.addLoad('[TASKS][UPDATE]');

        return this.tasksService.update(action.task).pipe(
          map((task: Task) => tasksActions.taskUpdated({ task })),
          tap(() => this.notifyService.openSnackBar('Successfully Updated a Task')),
          tap(() => this.appFacade.removeLoad('[TASKS][UPDATE]'))
        );
      },
      onError: (action: ReturnType<typeof tasksActions.updateTask>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  deleteTask$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(tasksActions.deleteTask, {
      run: (
        action: ReturnType<typeof tasksActions.deleteTask>,
        state: TasksPartialState
      ) => {
        this.appFacade.addLoad('[TASKS][DELETE]');
        return this.tasksService.delete(action.task.id).pipe(
          map((task: Task) => tasksActions.taskDeleted({ task })),
          tap(() => this.notifyService.openSnackBar('Successfully Deleted a Task')),
          tap(() => this.tasksFacade.loadTasks()),
          tap(() => this.appFacade.removeLoad('[TASKS][DELETE]'))
        );
      },
      onError: (action: ReturnType<typeof tasksActions.deleteTask>, error) => {
        console.log('Effect Error:', error);
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<TasksPartialState>,
    private tasksService: TasksService,
    private tasksFacade: TasksFacade,
    private notifyService: SnackbarService,
    private appFacade: AppFacade
  ) {}
}
