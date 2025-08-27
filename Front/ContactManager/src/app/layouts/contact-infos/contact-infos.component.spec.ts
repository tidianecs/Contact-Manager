import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfosComponent } from './contact-infos.component';

describe('ContactInfosComponent', () => {
  let component: ContactInfosComponent;
  let fixture: ComponentFixture<ContactInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
