import { Component,signal } from '@angular/core';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline } from '@ant-design/icons-angular/icons';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    NgIf,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private _username = signal('');
  private _password = signal('');

  get username(): string {
    return this._username();
  }
  set username(value: string) {
    this._username.set(value);
  }

  get password(): string {
    return this._password();
  }
  set password(value: string) {
    this._password.set(value);
  }
  loading = signal(false);
  errorMessage = signal('');

  constructor(private loginService: LoginService, private router: Router,private authService:AuthService) {}

login() {
    this.errorMessage.set('');

    if (!this.username || !this.password) {
      this.errorMessage.set('لطفاً نام کاربری و رمز عبور را وارد کنید');
      return;
    }

  this.loading.set(true);
this.loginService.login({
  username: this.username,
  password: this.password
}).subscribe({
  next: (res) => {
        if (res.success) {
          this.authService.setToken(res.data);
          this.authService.setUser(this.username);
          this.router.navigate(['/']);
        } else {
          this.errorMessage.set(res.error || 'نام کاربری یا رمز عبور اشتباه است');
        }
      },
      error: (err) => {
        if (err.status === 400 && err.error?.error) {
          this.errorMessage.set(err.error.error);
        } else {
          this.errorMessage.set('مشکل در ارتباط با سرور');
        }
        this.loading.set(false);
      },
  complete: () => this.loading.set(false)
});
}}