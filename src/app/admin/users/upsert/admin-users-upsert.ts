import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
@Component({
    standalone: true,
    imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule],
    templateUrl: './admin-users-upsert.html',
    styleUrl: './admin-users-upsert.less'
})
export class AdminUserUpsertComponent{
      private fb = inject(NonNullableFormBuilder);
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required,Validators.minLength(4)]),
    password: this.fb.control('', [Validators.required,Validators.minLength(6)]),
    role: this.fb.control('', [Validators.required,Validators.minLength(4)]),
  });
}