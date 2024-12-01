import { Component, OnInit } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-gestion-eventos',
  templateUrl: './gestion-eventos.component.html',
  styleUrls: ['./gestion-eventos.component.css'],
})
export class GestionEventosComponent implements OnInit {
  eventos: any[] = [];
  mostrarModal: boolean = false;
  esEdicion: boolean = false; // Controla si el modal está en modo edición
  eventoActual: any = { nombre: '', fecha: '', ubicacion: '', descripcion: '', imagen: '' };
  imagenSeleccionada: File | null = null; // Imagen seleccionada para subir
  esOrganizador: boolean = false;
  usuarioLogueado: boolean = false;

  constructor(
    private eventosService: EventosService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarEventos();
  }

  cargarEventos(): void {
    this.eventosService.getAllEventosOrganizadores().subscribe(
      (data) => (this.eventos = data),
      (error) => console.error('Error al cargar eventos:', error)
    );
  }

  abrirModalCrear(): void {
    this.esEdicion = false;
    this.eventoActual = { nombre: '', fecha: '', ubicacion: '', descripcion: '', imagen: '' };
    this.imagenSeleccionada = null; // Reinicia la imagen seleccionada
    this.mostrarModal = true;
  }

  abrirModalEditar(evento: any): void {
    this.esEdicion = true;
    this.eventoActual = { ...evento }; // Copia el evento seleccionado
    this.imagenSeleccionada = null; // Reinicia la imagen seleccionada
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
    this.eventoActual = { nombre: '', fecha: '', ubicacion: '', descripcion: '', imagen: '' };
    this.imagenSeleccionada = null; // Limpia la imagen seleccionada
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  crearEvento(): void {
    const formData = new FormData();
    formData.append('nombre', this.eventoActual.nombre);
    formData.append('fecha', this.eventoActual.fecha);
    formData.append('ubicacion', this.eventoActual.ubicacion);
    formData.append('descripcion', this.eventoActual.descripcion);

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.eventosService.createEvento(formData).subscribe(
      () => {
        alert('Evento creado con éxito.');
        this.cargarEventos();
        this.cerrarModal();
      },
      (error) => console.error('Error al crear evento:', error)
    );
  }

  actualizarEvento(): void {
    const formData = new FormData();
    formData.append('nombre', this.eventoActual.nombre);
    formData.append('fecha', this.eventoActual.fecha);
    formData.append('ubicacion', this.eventoActual.ubicacion);
    formData.append('descripcion', this.eventoActual.descripcion);

    if (this.imagenSeleccionada) {
      formData.append('imagen', this.imagenSeleccionada);
    }

    this.eventosService.updateEvento(this.eventoActual.idEvento, formData).subscribe(
      () => {
        alert('Evento actualizado con éxito.');
        this.cargarEventos();
        this.cerrarModal();
      },
      (error) => console.error('Error al actualizar evento:', error)
    );
  }

  eliminarEvento(eventoId: number): void {
    if (confirm('¿Estás seguro de eliminar este evento?')) {
      this.eventosService.deleteEvento(eventoId).subscribe(
        () => {
          alert('Evento eliminado con éxito.');
          this.cargarEventos();
        },
        (error) => console.error('Error al eliminar evento:', error)
      );
    }
  }

  irAInicio(): void {
    this.router.navigate(['/eventos']); // Ruta a la lista de eventos
  }

  irACertificados(): void {
    this.router.navigate(['/certificados']); // Ruta a los certificados
  }
}
