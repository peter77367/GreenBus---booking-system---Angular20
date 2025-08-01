import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IRegisterData } from '../Models/iregister-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  private loggedIn = new BehaviorSubject<boolean>(this.hasUser());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // ✅ التسجيل
  register(user: IRegisterData): Observable<IRegisterData> {
    return this.http.post<IRegisterData>(this.apiUrl, user);
  }

  // ✅ جلب المستخدمين
  getUsers(): Observable<IRegisterData[]> {
    return this.http.get<IRegisterData[]>(this.apiUrl);
  }

  // ✅ تسجيل الدخول
  login(email: string, password: string): Observable<IRegisterData[]> {
    return this.http.get<IRegisterData[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  // ✅ حفظ المستخدم وتحديث الحالة
  setLoggedInUser(user: IRegisterData): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.loggedIn.next(true);
  }

  // ✅ استرجاع المستخدم
  getCurrentUser(): IRegisterData | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // ✅ تسجيل الخروج
  logout(): void {
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }

  // ✅ هل المستخدم مسجّل دخول؟
  private hasUser(): boolean {
    return !!localStorage.getItem('user');
  }

  // update phone 
  updateUser(userId: number, updatedUser: IRegisterData): Observable<IRegisterData> {
    return this.http.put<IRegisterData>(`${this.apiUrl}/${userId}`, updatedUser);
  }
}
