import { Component, signal } from '@angular/core';
import { Child } from '../child/child';

@Component({
  imports: [Child],
  selector: 'app-parent2',
  styleUrl: './parent2.css',
  templateUrl: './parent2.html',
})
export class Parent2 {

  p2count = signal(0);

  handleDec(val: number) {

    console.log("parent2 => ", val);
    this.p2count.set(val)
  }
}
