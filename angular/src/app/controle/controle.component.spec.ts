import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleComponent } from './controle.component';

describe('ControleComponent', () => {
  let component: ControleComponent;
  let fixture: ComponentFixture<ControleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
