import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZixoComponent } from './zixo.component';

describe('ZixoComponent', () => {
  let component: ZixoComponent;
  let fixture: ComponentFixture<ZixoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZixoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
