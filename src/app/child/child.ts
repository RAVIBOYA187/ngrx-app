import { Component, Input, input, OnInit, output, signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-child',
  styleUrl: './child.css',
  templateUrl: './child.html',
})
export class Child implements OnInit {

  name = input<string>()
  count = signal(0);

  p2name = input<number>()

  countInc = output<number>()

  countDec = output<number>()


  constructor() {
    console.log(this.name())
  }

  ngOnInit(): void {
    console.log(this.name());
  }

  inc() {
    this.count.set(this.count() + 1)
    this.countInc.emit(this.count())
    console.log("count inc => ", this.count());
    // console.log("hhhhhh");
  }

  dec() {
    this.count.update(() => this.count() - 1)
    this.countDec.emit(this.count())
    console.log("child dec : ", this.count());
  }

}
