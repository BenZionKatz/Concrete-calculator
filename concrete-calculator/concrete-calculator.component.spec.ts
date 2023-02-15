import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcreteCalculatorComponent } from './concrete-calculator.component';

describe('ConcreteCalculatorComponent', () => {
  let component: ConcreteCalculatorComponent;
  let fixture: ComponentFixture<ConcreteCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConcreteCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcreteCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
