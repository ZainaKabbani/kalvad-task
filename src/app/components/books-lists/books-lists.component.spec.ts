import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListsComponent } from './books-lists.component';

describe('BooksListsComponent', () => {
  let component: BooksListsComponent;
  let fixture: ComponentFixture<BooksListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
