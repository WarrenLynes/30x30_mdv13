import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  TASKS_FEATURE_KEY,
  tasksAdapter,
  TasksState
} from './tasks.reducer';
import { emptyTask } from '@mdv13/core-data';

export const selectTasksState =
  createFeatureSelector<TasksState>(TASKS_FEATURE_KEY);

const { selectAll, selectEntities } = tasksAdapter.getSelectors();

export const selectTasksLoading = createSelector(
  selectTasksState,
  (state: TasksState) => state.isLoading
);

export const selectAllTasks = createSelector(
  selectTasksState,
  (state: TasksState) => selectAll(state)
);

export const selectTasksEntities = createSelector(
  selectTasksState,
  (state: TasksState) => selectEntities(state)
);

export const selectTaskId = createSelector(
  selectTasksState,
  (state: TasksState) => state.selectedTaskId
);

export const selectTask = createSelector(
  selectTasksEntities,
  selectTaskId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId] : emptyTask
  }
);
