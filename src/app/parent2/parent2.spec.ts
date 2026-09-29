import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parent2 } from './parent2';

describe('Parent2', () => {
  let component: Parent2;
  let fixture: ComponentFixture<Parent2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Parent2],
    }).compileComponents();

    fixture = TestBed.createComponent(Parent2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
