import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventosComponent } from './Components/eventos/eventos.component';
import { PalestrantesComponent } from './Components/palestrantes/palestrantes.component';
import { NavComponent } from './Components/Shared/nav/nav.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EventoService } from './Services/evento.service';
import { DataFormatPipe } from './Helpers/data-format.pipe';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';


import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TituloComponent } from './Components/Shared/titulo/titulo.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { ContatosComponent } from './Components/contatos/contatos.component';
import { PerfilComponent } from './Components/user/perfil/perfil.component';
import { EventosDetalheComponent } from './Components/eventos/eventos-detalhe/eventos-detalhe.component';
import { EventoListaComponent } from './Components/eventos/evento-lista/evento-lista.component';

import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { CadastroComponent } from './Components/user/cadastro/cadastro.component';


defineLocale('pt-br', ptBrLocale);
@NgModule({
  declarations: [
    AppComponent,
    EventosComponent,
    PalestrantesComponent,
    NavComponent,
    DataFormatPipe,
    TituloComponent,
    DashboardComponent,
    ContatosComponent,
    PerfilComponent,
    EventosDetalheComponent,
    EventoListaComponent,
    UserComponent,
    LoginComponent,
    CadastroComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(), 
    ModalModule.forRoot(),
    ToastrModule.forRoot(
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',
        preventDuplicates: true,
      }
    ),
    NgxSpinnerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  providers: [EventoService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
