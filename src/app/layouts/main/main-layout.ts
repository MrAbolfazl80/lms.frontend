import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header';
// import { FooterComponent } from '../../footer/footer';


@Component({
  selector: 'main-layout',
  standalone:true,
  imports: [RouterOutlet,HeaderComponent],
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.less']
})
export class MainLayout {
  protected readonly title = signal('SimpleLmsApp');
}
