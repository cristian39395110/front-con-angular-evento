import { Component } from '@angular/core';
import { EventosService } from '../../servicios/eventos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificados',
  templateUrl: './certificados.component.html',
  styleUrls: ['./certificados.component.css'],
})
export class CertificadosComponent {
  email: string = '';
  certificados: { nombre: string; fecha: string,descripcion: string ,ubicacion:string }[] = [];

  constructor(private eventosService: EventosService,private router: Router) {}

  obtenerCertificados(): void {
    if (!this.email) {
      alert('Por favor, ingresa un correo válido.');
      return;
    }

    this.eventosService.obtenerEventosConfirmados(this.email).subscribe(
      (eventos) => {
        this.certificados = eventos;
      },
      (error) => {
        console.error('Error al obtener certificados:', error);
        alert('No se pudieron obtener los certificados.');
      }
    );
  }

  descargarPDF(): void {
    const doc = new Blob(
      [
        `
        Certificados de Asistencia

        Eventos Confirmados para ${this.email}:

        ${this.certificados
          .map(
            (certificado, index) =>
              `${index + 1}. ${certificado.nombre} - ${certificado.descripcion}- ${certificado.ubicacion}- ${certificado.fecha}`
          )
          .join('\n')}
      `,
      ],
      { type: 'application/pdf' }
    );

    const link = document.createElement('a');
    link.href = URL.createObjectURL(doc);
    link.download = `certificados_${this.email}.pdf`;
    link.click();
  }
  imprimirCertificado(certificado: any): void {
    const contenido = `
      <div style="border: 2px solid #007bff; padding: 20px; border-radius: 10px; max-width: 600px; margin: 0 auto;">
        <h1 style="text-align: center; color: #007bff;">Certificado de Asistencia</h1>
        <p style="font-size: 16px; text-align: center;">
          Usted ha asistido al evento <strong>${certificado.nombre}</strong>, 
          ubicado en <strong>${certificado.ubicacion || 'Ubicación no especificada'}</strong>.
        </p>
        <p style="font-size: 16px; text-align: center;">
          Fecha: <strong>${new Date(certificado.fecha).toLocaleDateString()}</strong>
        </p>
      </div>
    `;
    const ventana = window.open('', '_blank');
    if (ventana) {
      ventana.document.write(contenido);
      ventana.document.close();
      ventana.print();
    } else {
      alert('No se pudo abrir la ventana para imprimir.');
    }
  }
  irAInicio(): void {
    this.router.navigate(['/eventos']); // Ruta a la lista de eventos
  }

  irACertificados(): void {
    this.router.navigate(['/certificados']); // Ruta a los certificados
  }


}