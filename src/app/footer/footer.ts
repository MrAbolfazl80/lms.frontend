import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone:true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.less']
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
