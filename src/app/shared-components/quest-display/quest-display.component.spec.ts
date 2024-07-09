import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestDisplayComponent } from './quest-display.component';

describe('QuestDisplayComponent', () => {
  let component: QuestDisplayComponent;
  let fixture: ComponentFixture<QuestDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
