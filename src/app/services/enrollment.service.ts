import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppConfigService } from "./myAppConfigService";
interface EnrollResponse{
    data:boolean,
    error:string|null,
    success:boolean
}
@Injectable({
  providedIn: 'root'
})
export class EnrollmentService{
    constructor(private http:HttpClient,private appConfig:AppConfigService){}
    enroll(courseId:number):Observable<EnrollResponse>{
        return this.http.post<EnrollResponse>(`${this.appConfig.baseUrl+'/Enrollment'}/${courseId}`, null);
    }
}