import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class AppConfigService{
    readonly baseUrl='https://localhost:44343/api';
}