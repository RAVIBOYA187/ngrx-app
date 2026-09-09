import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { counterState } from './counter.reducer';
import { decrement, increment, reset } from './counter.actions';
import { countSelectFeature, } from './counter.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  imports: [AsyncPipe],
  selector: 'app-counter',
  styleUrl: './counter.css',
  templateUrl: './counter.html',
})
export class Counter implements OnInit {

  val !: number;

  count !: Observable<number>

  ngOnInit(): void {

    // this.store.select(selectCount).subscribe(d => {
    //   this.val = d
    // })

    // this.store.select(selectCountState).subscribe(d => {
    //   this.val = d.count
    // })

    this.store.select(countSelectFeature.selectCount).subscribe(ans => {
      this.val = ans
    })

    this.count = this.store.select(countSelectFeature.selectCount)
  }


  private store = inject(Store<counterState>)

  inc() {
    this.store.dispatch(increment())
  }

  res() {
    this.store.dispatch(reset())
  }

  dec() {
    this.store.dispatch(decrement())
  }
}
