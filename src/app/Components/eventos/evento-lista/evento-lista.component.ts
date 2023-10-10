import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/Models/evento';
import { EventoService } from 'src/app/Services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.css']
})
export class EventoListaComponent {
  constructor(private eventoService : EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router : Router,
    ){}
 
   modalRef?: BsModalRef;
   message?: string;
 
   public eventos: Evento[] = [];
   public eventosFiltrados: any = [];
   public eventoId : number = 0;
 
   tamanhoImagem : number = 150;
   alturaImagem : number = 100;
 
   escondeImagem = true;
 
   private _filtroLista : string = "";
 
   public get filtroLista(){
 
     return this._filtroLista;
   }
 
   public set filtroLista( value: string){
 
     this._filtroLista = value;
     this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos
   }
 
   public filtrarEventos(filtrarPor: string): Evento[] {
     filtrarPor = filtrarPor.toLocaleLowerCase();
     return this.eventos.filter(
       (evento) =>
         evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1 ||
         evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
     );
   }
 
   mostraEscondeImg(){
     this.escondeImagem = !this.escondeImagem
   }
 
   ngOnInit(): void{
       
     this.spinner.show();
     this.getEventos();
  
   }
 
   public getEventos () : void{
     this.eventoService.getEventos().subscribe({
       next:(_eventos : Evento []) => {
         this.eventos = _eventos
         this.eventosFiltrados = this.eventos
       },
       error : (error :any) => {
         this.spinner.hide();
       },
       complete: () => this.spinner.hide()
     });
   }
 
 
   openModalWithClass(event: any,template: TemplateRef<any>, eventoIdPEcluir : number) {
    //para nao mandar para  a outra pagina com o evento carregado. 
    event.stopPropagation();
    this.eventoId = eventoIdPEcluir;
     this.modalRef = this.modalService.show(
       template,
       Object.assign({}, { class: 'gray modal-lg' })
     );
   }
 
   confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next:() => {
          this.toastr.success('Evento excluido com sucesso!', 'Pronto !');
          this.getEventos();
      } ,
      error: (e) => {
        console.log(e);
        this.toastr.error('Erro ao excluir o Evento!');
        this.spinner.hide();
      },
      complete: () => {this.modalRef?.hide();}
    })

   
   }
  
   decline(): void {
     
     this.modalRef?.hide();
   }

   detalhe ( eventoId : number) : void{
    this.router.navigate([`/eventos/detalhe/${eventoId}`])
   }
}
