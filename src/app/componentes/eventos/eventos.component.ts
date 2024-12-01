import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';


// Define la interfaz para los usuarios inscritos
interface UsuarioInscrito {
  idParticipacion: number;
  email: string;
  confirmacion: boolean;
}

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
})
export class EventosComponent implements OnInit {
  eventos: any[] = [];
  usuariosInscritos: UsuarioInscrito[] = []; // Ahora usa la interfaz
  eventoSeleccionado: any = null;
  mostrarModal: boolean = false;
  mostrarModalDetalles: boolean = false; // Controla el modal de detalles
mostrarModalInscritos: boolean = false; // Controla el modal de inscritos
 // Evento actualmente seleccionado

  email: string = '';
  nombre: string = '';
  error: string = '';
  esOrganizador: boolean = false;
  usuarioLogueado: boolean = false;
  mensaje: string = ''; // Mensaje de éxito o error
  filtro: string = ''; 

  constructor(
    private eventosService: EventosService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.cargarEventos();
  }

  checkLoginStatus(): void {
    this.authService.checkSession().subscribe(
      (response) => {
        this.usuarioLogueado = true;
        this.esOrganizador = response.userRole === 'organizador'; // Evalúa el rol
        console.log('Rol del usuario:', response.userRole); // Depuración
      },
      (error) => {
        this.usuarioLogueado = false;
        this.esOrganizador = false; // Por defecto no es organizador si no está autenticado
        console.error('Error al verificar sesión:', error);
      }
    );
  }
  
  irAInicio(): void {
    this.router.navigate(['/eventos']); // Ruta a la lista de eventos
  }

  irACertificados(): void {
    this.router.navigate(['/certificados']); // Ruta a los certificados
  }

  irALogin(): void {
    this.router.navigate(['/login']); // Ruta a la página de login
  }


  cargarEventos(): void {
    this.eventosService.getAllEventos().subscribe(
      (data) => {
        console.log('Eventos cargados:', data); // Verifica si los eventos tienen un campo "id"
        this.eventos = data;
      },
      (error) => {
        this.error = 'No se pudieron cargar los eventos.';
      }
    );
  }








  cerrarModal(): void {
    this.mostrarModal = false;
    this.eventoSeleccionado = null;
    this.email = '';
    this.error = '';
  }

  inscribirse(): void {
    if (!this.email) {
      this.error = 'Por favor, ingresa un correo válido.';
      return;
    }

    console.log('ID del evento seleccionado:', this.eventoSeleccionado.idEvento); // Para verificar el ID
    console.log('Correo ingresado:', this.email); // Para verificar el correo

    this.eventosService.registrarAsistencia(this.eventoSeleccionado.idEvento, this.email,this.nombre).subscribe(
      (response) => {
        this.mensaje = response.message; // Mensaje de éxito
        alert(this.mensaje);
        this.cerrarModal();
      },
      (error) => {
        this.error = error.error.message || 'Error al registrarse.';
      }
    );
  }
  abrirModal(evento: any): void {
    this.eventoSeleccionado = evento; // Selecciona el evento para mostrar
    this.mostrarModal = true;        // Abre el modal
  
    if (this.usuarioLogueado) {
      this.eventosService.getUsuariosInscritos(evento.idEvento).subscribe(
        (usuarios) => {
          console.log('Usuarios inscritos:', usuarios);
          this.usuariosInscritos = usuarios; // Asigna usuarios inscritos
        },
        (error) => {
          console.error('Error al cargar usuarios inscritos:', error);
        }
      );
    }
  }
  
  marcarAsistencia(idParticipacion: number): void {
    this.eventosService.marcarAsistencia(idParticipacion).subscribe(
      (response) => {
        alert('Asistencia marcada con éxito.');
        this.recargarUsuariosInscritos(); // Actualiza la lista de usuarios
      },
      (error) => {
        console.error('Error al marcar asistencia:', error);
      }
    );
  }
  
  anularAsistencia(idParticipacion: number): void {
    this.eventosService.anularAsistencia(idParticipacion).subscribe(
      (response) => {
        alert('Asistencia anulada con éxito.');
        this.recargarUsuariosInscritos(); // Actualiza la lista de usuarios
      },
      (error) => {
        console.error('Error al anular asistencia:', error);
      }
    );
  }
  
  recargarUsuariosInscritos(): void {
    if (this.eventoSeleccionado) {
      this.eventosService.getUsuariosInscritos(this.eventoSeleccionado.idEvento).subscribe(
        (usuarios) => {
          this.usuariosInscritos = usuarios;
        },
        (error) => {
          console.error('Error al recargar usuarios inscritos:', error);
        }
      );
    }
  }
  

  
  abrirModalInscritos(evento: any): void {
    this.eventoSeleccionado = evento; // Guarda el evento seleccionado
    this.mostrarModalInscritos = true; // Abre el modal de inscritos
  
    this.eventosService.getUsuariosInscritos(evento.idEvento).subscribe(
      (usuarios) => {
        this.usuariosInscritos = usuarios; // Carga los usuarios inscritos
      },
      (error) => {
        console.error('Error al cargar usuarios inscritos:', error);
      }
    );
  }
  
  cerrarModalInscritos(): void {
    this.mostrarModalInscritos = false; // Cierra el modal de inscritos
    this.eventoSeleccionado = null; // Limpia el evento seleccionado
  }
  abrirModalDetalles(evento: any, event: Event): void {
    event.stopPropagation(); // Evita que el evento de la fila se dispare
    this.eventoSeleccionado = evento; // Guarda el evento seleccionado
    this.mostrarModalDetalles = true; // Abre el modal de detalles
  }
  
  cerrarModalDetalles(): void {
    this.mostrarModalDetalles = false; // Cierra el modal
    this.eventoSeleccionado = null; // Limpia la selección
  }
  
  


  logout(): void {
    this.authService.logout().subscribe(
      () => {
        this.usuarioLogueado = false;
        alert('Has cerrado sesión.');
      },
      (error) => {
        console.error('Error al cerrar sesión:', error);
      }
    );
  }
}
