import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../servicios/usuarios.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: any[] = []; // Variable para almacenar los usuarios

  constructor(private usuariosService: UsuariosService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getAllUsuarios().subscribe(
      (data) => {
        console.log('Usuarios obtenidos:', data);
        this.usuarios = data; // Asigna los usuarios a la variable
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
}
