import { createAction, props } from '@ngrx/store';

import { Task } from '@mdv13/core-data';

export const taskSelected = createAction(
  '[TASK][SELECTED]',
  props<{ selectedTaskId: string }>()
);
export const loadTasks = createAction('[TASK][LOAD]');
export const tasksLoaded = createAction(
  '[TASK][LOADED]',
  props<{ tasks: Task[] }>()
);
export const createTask = createAction(
  '[TASK][CREATE]',
  props<{ task: Task }>()
);
export const taskCreated = createAction(
  '[TASK][CREATED]',
  props<{ task: Task }>()
);
export const updateTask = createAction(
  '[TASK][UPDATE]',
  props<{ task: Task }>()
);
export const taskUpdated = createAction(
  '[TASK][UPDATED]',
  props<{ task: Task }>()
);
export const deleteTask = createAction(
  '[TASK][DELETE]',
  props<{ task: Task }>()
);
export const taskDeleted = createAction(
  '[TASK][DELETED]',
  props<{ task: Task }>()
);
