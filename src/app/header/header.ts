import { Component, signal, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NzButtonModule, NzLayoutModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.less',
})
export class HeaderComponent {
  userName = signal<string | null>(null);

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    this.authService.userName$.subscribe(name => {
      this.userName.set(name);
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.clearToken();
    this.authService.clearUser();
    this.userName.set(null);
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/courses']);
    });
  }
  isLoginPage(): boolean {
    return this.router.url === '/login'
  }
  isAdmin(): boolean {
    return this.authService.getUserRole() === 'Admin';
  }
}