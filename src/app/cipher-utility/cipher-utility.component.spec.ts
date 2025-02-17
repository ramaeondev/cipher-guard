import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CipherUtilityComponent } from './cipher-utility.component';

describe('CipherUtilityComponent', () => {
  let component: CipherUtilityComponent;
  let fixture: ComponentFixture<CipherUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CipherUtilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CipherUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
