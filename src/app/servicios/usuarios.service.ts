import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios/getAllUsuarios';

  constructor(private http: HttpClient) {}

  getAllUsuarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { withCredentials: true });
  }
}
