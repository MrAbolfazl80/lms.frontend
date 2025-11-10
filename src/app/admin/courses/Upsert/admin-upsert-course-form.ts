import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzFormModule } from 'ng-zorro-antd/form';


@Component({
  selector: 'app-admin-upsert-course-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzFormModule
  ],
  templateUrl: './admin-upsert-course-form.html',
  styleUrls: ['./admin-upsert-course-form.css']
})
export class UpsertCourseFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      teacherName: [null, Validators.required],
      capacity: [1, [Validators.required, Validators.min(1)]],
      fee: [0, [Validators.required, Validators.min(0)]],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      description: [null,Validators.required]
    });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}