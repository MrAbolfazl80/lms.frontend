import { Component } from '@angular/core';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'admin-sidebar',
  standalone: true,
  imports: [NzMenuModule, RouterModule, NzIconModule, NzLayoutModule],
  templateUrl: './admin-sidebar.html',
  styleUrls: ['./admin-sidebar.less']
})
export class AdminSidebarComponent {
  isCollapsed = false;
  isAdmin = false;
  baseRoute = 'user';
  constructor(authService: AuthService) {
    if (authService.getUserRole()?.toLowerCase() === 'admin') {
      this.isAdmin = true;
      this.baseRoute = 'admin';
    }
  }
}
