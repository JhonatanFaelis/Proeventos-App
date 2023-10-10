import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent {

  constructor( private router : Router){}
  
@Input() titulo : string | undefined ;
@Input() iconClass : string | undefined ;
@Input() subRota : string | undefined ;


listar() : void {
  
    this.router.navigate([`/${this.titulo?.toLowerCase()}/lista`]);
}


}


