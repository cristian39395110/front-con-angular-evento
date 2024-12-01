import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private apiUrl = 'http://localhost:3000/api/eventos'; // URL del backend para eventos
  private partapiUrl = 'http://localhost:3000/api/participacion';

  constructor(private http: HttpClient) {}

  // Obtener todos los eventos
  getAllEventos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { withCredentials: true });
  }
  getAllEventosOrganizadores(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/api/eventos/organizador', { withCredentials: true });
  }
  
  // Crear un nuevo evento

  registrarAsistencia(eventoId: number, email: string,nombre: string): Observable<any> {
    const url = `${this.apiUrl}/${eventoId}/registrar-asistencia`;
    console.log('URL generada:', url); // Depuración
    return this.http.post(url, { email,nombre }, { withCredentials: true });
  }
  
  obtenerEventosConfirmados(email: string): Observable<any[]> {
    const url = `http://localhost:3000/api/certificados?email=${email}`;
    return this.http.get<any[]>(url, { withCredentials: true });
  }
  

 
  createEvento(evento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, evento, { withCredentials: true });
  }
  
  // Actualizar un evento
  updateEvento(eventoId: number, evento: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${eventoId}`, evento, { withCredentials: true });
  }

  // Eliminar un evento
  deleteEvento(eventoId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${eventoId}`, { withCredentials: true });
  }

  // Obtener usuarios inscritos en un evento
 
  actualizarConfirmacion(participacionId: number, confirmacion: boolean): Observable<any> {
    const url = `http://localhost:3000/api/eventos/${participacionId}/usuarios-inscritos`;
    return this.http.put(url, { confirmacion }, { withCredentials: true });
  }
  
  // Método para obtener usuarios inscritos a un evento
  getUsuariosInscritos(eventoId: number): Observable<any[]> {
    const url = `http://localhost:3000/api/eventos/${eventoId}/usuarios-inscritos`;
    return this.http.get<any[]>(url, { withCredentials: true });
  }
  marcarAsistencia(participacionId: number): Observable<any> {
    const url = `http://localhost:3000/api/eventos/${participacionId}/marcar-asistencia`;
    return this.http.put(url, { confirmacion: true }, { withCredentials: true });
  }
  
  // Anular asistencia
  anularAsistencia(participacionId: number): Observable<any> {
    const url = `http://localhost:3000/api/eventos/${participacionId}/anular-asistencia`;
    return this.http.put(url, {}, { withCredentials: true });
  }


}
