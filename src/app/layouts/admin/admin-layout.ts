import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from '../../admin/sidebar/admin-sidebar';
import { AuthService } from '../../services/auth.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';


@Component({
  selector: 'admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent,NzBreadCrumbModule, NzLayoutModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayout {
  isCollapsed = false;
  protected readonly date = new Date();
  username: string | null = '';
  constructor(private authService: AuthService) {
    authService.userName$.subscribe(value => {
      this.username = value;
    });
  }
}
