import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTypeChartComponent } from './player-type-chart.component';

describe('PlayerTypeChartComponent', () => {
  let component: PlayerTypeChartComponent;
  let fixture: ComponentFixture<PlayerTypeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTypeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTypeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
