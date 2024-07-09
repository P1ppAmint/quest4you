import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerTypeComponent } from './player-type.component';

describe('PlayerTypeComponent', () => {
  let component: PlayerTypeComponent;
  let fixture: ComponentFixture<PlayerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
