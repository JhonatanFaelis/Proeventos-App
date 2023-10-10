import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventosComponent } from './Components/eventos/eventos.component';
import { PalestrantesComponent } from './Components/palestrantes/palestrantes.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PerfilComponent } from './Components/user/perfil/perfil.component';
import { ContatosComponent } from './Components/contatos/contatos.component';
import { EventoListaComponent } from './Components/eventos/evento-lista/evento-lista.component';
import { EventosDetalheComponent } from './Components/eventos/eventos-detalhe/eventos-detalhe.component';
import { UserComponent } from './Components/user/user.component';
import { LoginComponent } from './Components/user/login/login.component';
import { CadastroComponent } from './Components/user/cadastro/cadastro.component';

const routes: Routes = [
  {path: 'user', component: UserComponent,
    children:
    [
      {path: 'login', component: LoginComponent},
      {path: 'cadastro', component: CadastroComponent},
    ]
  },
  {path: 'user/perfil', component : PerfilComponent},
  {path: 'eventos', redirectTo : 'eventos/lista', pathMatch : 'full'},
  {
    path : 'eventos', component : EventosComponent,
children:
[
  {path : 'lista', component : EventoListaComponent},
  {path : 'detalhe', component : EventosDetalheComponent},
  {path : 'detalhe/:id', component : EventosDetalheComponent},
]
},
  {path: 'palestrantes', component : PalestrantesComponent},
  {path: 'dashboard', component : DashboardComponent},
  
  {path: 'contatos', component : ContatosComponent},
  {path: '', redirectTo : 'dashboard', pathMatch : 'full'},
  {path: '**', redirectTo : 'dashboard', pathMatch : 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
