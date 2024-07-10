import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuhtorListComponent } from './auhtor-list.component';

describe('AuhtorListComponent', () => {
  let component: AuhtorListComponent;
  let fixture: ComponentFixture<AuhtorListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuhtorListComponent]
    });
    fixture = TestBed.createComponent(AuhtorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
