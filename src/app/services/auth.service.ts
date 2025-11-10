import { HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { jwtDecode } from 'jwt-decode';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private userNameSource = new BehaviorSubject<string | null>(this.getUserFromStorage());
    userName$ = this.userNameSource.asObservable();

    getUserRole(): string | null {
        const token = this.getToken();
        if (!token) return null;
        try {
            const decoded: any = jwtDecode(token);
            return (
                decoded.role || null
            );
        } catch (error) {
            return null;
        }
    }
    private getUserFromStorage(): string | null {
        return localStorage.getItem('userName')
    }
    setUser(name: string): void {
        localStorage.setItem('userName', name);
        this.userNameSource.next(name);
    }
    clearUser(): void {
        localStorage.clear();
        this.userNameSource.next(null);
    }
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }
    getToken(): string | null {
        return localStorage.getItem('token');
    }
    clearToken(): void {
        localStorage.clear();
    }
    isLoggedIn(): boolean {
        return !!this.getUserFromStorage();
    }
    getHeadersForHttpRequest(): HttpHeaders {
        return new HttpHeaders({
            Authorization: `Bearer ${this.getToken()}`
        });
    }
}