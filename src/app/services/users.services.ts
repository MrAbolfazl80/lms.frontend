import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "./myAppConfigService";
import { Observable } from "rxjs";
import { BaseResponse } from "../models/base-response.model";
import { PagedResponse } from "../models/paged-response-model";
import { User } from "../models/users/user-model";



@Injectable({
  providedIn: 'root'
})
export class UsersServices{
    constructor (private http:HttpClient,private appConfig:AppConfigService){}
    getAllUsers(userName:string|null,role:string|null,pageNumber:number,pageSize:number)
    :Observable<BaseResponse<PagedResponse<User>>>{
        return this.http.post<BaseResponse<PagedResponse<User>>>(
            `${this.appConfig.baseUrl}/user/getAllUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`,{userName,role});
    }
}