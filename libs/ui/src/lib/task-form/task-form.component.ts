import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Task } from '@mdv13/core-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mdv13-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnChanges, OnDestroy {

  destroy$: Subject<boolean> = new Subject();
  taskForm: FormGroup;
  time = 0;
  @Input() task: Task;
  @Output() saveTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  constructor() {
    this.buildForm();
  }



  get seconds() {
    const seconds = this.time - Math.floor(this.time / 60) * 60;
    return this.formatTime(seconds);
    // return seconds < 10 ? `0${seconds}` : seconds;
  }
  get minutes() {
    const minutes = Math.floor(this.time / 60);
    return this.formatTime(minutes);
    // return minutes < 10 ? `0${minutes}` : minutes;
  }
  get hours() {
    const hours = Math.floor(this.time / 3600);
    return this.formatTime(hours);
    // return hours < 10 ? `0${hours}` : hours;
  }

  formatTime(timeInt: number) {
    return timeInt < 10 ? `0${timeInt}` : timeInt
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.task && changes.task.currentValue) {
      this.time = this.task.time;
      this.buildForm();
    }
  }

  buildForm() {
    if(this.task && this.task.id) {
      this.taskForm = new FormGroup({
        name: new FormControl(this.task.name, Validators.required),
        description: new FormControl(this.task.description, Validators.required),
        estimate: new FormControl(this.task.estimate, Validators.required)
      })
    } else {
      this.taskForm = new FormGroup({
        name: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        estimate: new FormControl(0, Validators.required)
      })
    }
  }

  startInterval() {
    interval(1000).pipe(
      takeUntil(this.destroy$),
    ).subscribe((x) => {
      this.time += 1;
    });
  }

  save() {
    this.saveTask.emit({...this.task, ...this.taskForm.value, time: this.time});
    this.reset();
  }

  stopInterval() {
    this.destroy$.next(true);
  }

  reset() {
    this.destroy$.next(true);
    this.buildForm();
    this.time = 0;
  }

}
