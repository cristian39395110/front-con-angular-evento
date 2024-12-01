import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { EventosComponent } from './componentes/eventos/eventos.component';
import { CertificadosComponent } from './componentes/certificados/certificados.component';
import { GestionEventosComponent } from './componentes/gestion-eventos/gestion-eventos.component';
import { FiltroPipe } from './pipes/filtro.pipe'; // Importar componente

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    EventosComponent,
    CertificadosComponent,
    GestionEventosComponent,
    FiltroPipe // Declarar el nuevo componente
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
