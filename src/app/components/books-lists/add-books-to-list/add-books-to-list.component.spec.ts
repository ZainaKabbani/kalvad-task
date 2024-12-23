import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksToListComponent } from './add-books-to-list.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
class MatDialogRefMock {
  close = jasmine.createSpy('close');
}
describe('AddBooksToListComponent', () => {
  let component: AddBooksToListComponent;
  let fixture: ComponentFixture<AddBooksToListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBooksToListComponent],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { someData: 'mock data' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBooksToListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
