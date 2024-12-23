import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddListComponent } from './add-list.component'; 
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MatDialogRefMock {
  close = jasmine.createSpy('close');
}

describe('AddListComponent', () => {
  let component: AddListComponent;
  let fixture: ComponentFixture<AddListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        RouterModule.forRoot([]),
        AddListComponent,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useClass: MatDialogRefMock }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form control with required validator', () => {
    expect(component.listNameControl.hasError('required')).toBeTruthy();
  });

  it('should disable the Save button when form is invalid', () => {
    const saveButton = fixture.debugElement.query(
      By.css('button[cdkFocusInitial]')
    ).nativeElement;
    expect(saveButton.disabled).toBeTrue();
  });

  it('should call save() method when Save button is clicked', () => {
    spyOn(component, 'save');

    component.listNameControl.setValue('New List');
    fixture.detectChanges();

    const saveButton = fixture.debugElement.query(
      By.css('button[cdkFocusInitial]')
    ).nativeElement;
    saveButton.click();

    expect(component.save).toHaveBeenCalled();
  });
});
