import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mdv13-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy, OnChanges {
  destroy$: Subject<boolean> = new Subject<boolean>();
  elapsed = 0;

  @Input() time: number;
  @Output() saveTime = new EventEmitter<number>();
  @Output() updateTime = new EventEmitter();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if(changes.time && changes.time.currentValue) {
      this.reset();
    }
  }

  ngOnInit() {
    // this.startInterval();
    console.log(this.elapsed);
  }

  ngOnDestroy(): void {
    this.stopInterval();
  }

  totalSeconds() {
    return this.elapsed + this.time;
  }

  getSeconds() {
    const total = this.totalSeconds();
    const seconds = total - Math.floor(total / 60) * 60;
    return seconds < 10 ? `0${seconds}` : seconds;
  }
  getMinutes() {
    const total = this.totalSeconds();
    const minutes = Math.floor(total / 60);
    return minutes < 10 ? `0${minutes}` : minutes;
  }
  getHours() {
    const total = this.totalSeconds();
    const hours = Math.floor(total / 3600);
    return hours < 10 ? `0${hours}` : hours;
  }

  startInterval() {
    interval(1000).pipe(
      takeUntil(this.destroy$),
    ).subscribe((x) => {
      this.elapsed += 1;
      this.updateTime.emit(this.elapsed + this.time);
    });
  }

  stopInterval() {
    // this.saveTime.emit(this.elapsed);
    this.destroy$.next(true);
  }

  reset() {
    this.elapsed = 0;
    this.destroy$.next(true);
  }

}
