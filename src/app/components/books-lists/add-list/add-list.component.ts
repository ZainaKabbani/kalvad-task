import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-add-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  templateUrl: './add-list.component.html',
  styleUrl: './add-list.component.scss',
  animations: [],
})
export class AddListComponent {
  readonly dialogRef = inject(MatDialogRef<AddListComponent>);
  listNameControl: FormControl;
  constructor() {
    this.listNameControl = new FormControl('', [Validators.required]);
  }
  public save(): void {
    if (this.listNameControl.valid) {
      this.dialogRef.close(this.listNameControl.value);
    }
  }
}
