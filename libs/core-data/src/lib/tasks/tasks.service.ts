import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map } from 'rxjs/operators';
import {Task, emptyTask} from './task';

const BASE_URL = 'https://my-30-x-30-database.herokuapp.com/';

@Injectable({ providedIn: 'root' })
export class TasksService {
  model = 'items';
  constructor(private httpClient: HttpClient) { }

  getUrl() {
    return `${BASE_URL}${this.model}`
  }

  all() {
    return this.httpClient.get(this.getUrl()).pipe(
      delay(1500),
      map((x: Task[]) => x.map(xx => ({...emptyTask, ...xx})))
    )
  }

  create(model) {
    return this.httpClient.post(this.getUrl(), model);
  }

  getUrlForId(id) {
    return `${this.getUrl()}/${id}`;
  }

  update(model) {
    return this.httpClient.patch(this.getUrlForId(model.id),model)
  }

  delete(modelId) {
    return this.httpClient.delete(this.getUrlForId(modelId))
  }
}
