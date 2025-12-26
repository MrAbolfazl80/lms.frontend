import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
@Component({
    selector:'admin-home',
    standalone:true,
    imports:[],
    templateUrl:'./admin-home.html',
    styleUrls:['./admin-home.less']
})
export class AdminHomeComponent{
      username: string | null = '';
      constructor(private authService: AuthService) {
        authService.userName$.subscribe(value => {
          this.username = value;
        });
      }
}