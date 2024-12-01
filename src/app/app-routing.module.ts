import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { CertificadosComponent } from './componentes/certificados/certificados.component';
import { EventosComponent } from './componentes/eventos/eventos.component'; // Importar el componente

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'certificados', component: CertificadosComponent },
  { path: 'gestion-eventos', component: GestionEventosComponent }, 
  { path: 'eventos', component: EventosComponent }, // Ruta para el componente de eventos
  { path: '', redirectTo: '/eventos', pathMatch: 'full' } // Redirección inicial
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule {}
