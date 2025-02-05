import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { SysAdmin } from '../interfaces/sysAdmin.interface';

@Injectable({
  providedIn: 'root'
})
export class SysAdminService {
  private readonly endpoint = 'SysAdmin'; // Base API URL


  constructor(private readonly apiService: ApiService) {}

  // Login user
  loginUser(credentials: { id: number; password: string }): Observable<{ token: string; user: SysAdmin }> {
    return this.apiService.post<{ token: string; user: SysAdmin }>(`${this.endpoint}/login`, credentials);
  }

  // Logout user
  logoutUser(): void {
    sessionStorage.removeItem('user');
    localStorage.removeItem('activeUserSession');
  }


}
