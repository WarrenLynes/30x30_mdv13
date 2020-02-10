export interface Task {
  id: number;
  name: string;
  description: string;
  time: number;
  estimate: number;
}

export const emptyTask: Task = {
  name: null,
  description: null,
  time: 0,
  estimate: 0,
  id: null
};
