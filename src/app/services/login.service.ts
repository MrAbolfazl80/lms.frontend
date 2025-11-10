import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs"; 
import { AppConfigService } from "./myAppConfigService";

interface LoginRequest{
    username:string,
    password:string
}
interface LoginResponse{
    success: boolean,
    error: string,
    data: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {  
  constructor(private http: HttpClient,private appConfig:AppConfigService) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.appConfig.baseUrl+'/Auth/login', data);
  }
}