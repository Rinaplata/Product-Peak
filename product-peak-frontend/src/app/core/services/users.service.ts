import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private headers = new HttpHeaders();
  private baseUrl: string;

  constructor() { 
    this.baseUrl = 'http://localhost:3001/api/v1/user'
    this.headers.set('Access-Control-Allow-Origin:', '*')
  }

  register(formValue: any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/signUp`, formValue, {headers: this.headers})
    )
  }
}
