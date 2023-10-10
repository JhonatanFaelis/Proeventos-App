import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/Models/evento';
import { EventoService } from 'src/app/Services/evento.service';

@Component({
  selector: 'app-eventos-detalhe',
  templateUrl: './eventos-detalhe.component.html',
  styleUrls: ['./eventos-detalhe.component.css']
})
export class EventosDetalheComponent implements OnInit{

  constructor(private localeService: BsLocaleService,
    private router : ActivatedRoute,
    private eventoService : EventoService,
    private spinner : NgxSpinnerService,
    private toaster : ToastrService,
    ){
    this.localeService.use('pt-br');
  }

ngOnInit(): void {
  this.validarFormulario();
  this.carregarEvento();
}

  form!: FormGroup;
  evento = {} as Evento;
  estatoOperacao = 'post';

  get f (): any{
   return this.form.controls;
  }

  //colocando o get, ele funciona como propriedade, sendo assim no front eu não preciso chamar como função, se eu retirar o get ele perde a propriedade e tenho q chamar como função
  get confgData (): any {
    return { adaptivePosition : true ,
             dateInputFormat : 'DD/MM/YY hh:mm a',
             containerClass : 'theme-default',
             showWeekNumbers: false
      }
    
  }

  public validarFormulario () : void {
    this.form = new FormGroup({
      local : new FormControl('',Validators.required),
      dataEvento : new FormControl('',Validators.required),
      tema : new FormControl('',[Validators.minLength(4), Validators.required]),
      qtdPessoas : new FormControl('',Validators.required),
      telefone : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required,Validators.email]),
    })
  }

  public limparFormulario () : void {
    this.form.reset();
  }

  public carregarEvento() : void {
    const eventoIdParametro = this.router.snapshot.paramMap.get('id')

    if (eventoIdParametro !== null) {
      this.estatoOperacao = 'put';
      //colocado o spinner aqui para qnd chamar o evento aparecer o carregando
      this.spinner.show();
      //o + na frente do eventoId serve para converter em number
      this.eventoService.getEventoById(+eventoIdParametro).subscribe({
        next: (evento: Evento) =>{
          this.evento = {...evento}
          this.form.patchValue(this.evento)
        },
        error: (e) =>{
          this.spinner.hide();
          this.toaster.error('Erro ao carregar o evento','Erro!')
          console.log(e)
        },
        complete: () => this.spinner.hide()
      })
    }
  }

  public salvarOuAlterarEvento () : void {
    
    this.spinner.show();
    if(this.form.valid){
      if (this.estatoOperacao === 'post') {
        this.evento = {...this.form.value}

        this.eventoService.postEvento(this.evento).subscribe(
          {
            next : () =>{
              this.toaster.success("Evento salvo com sucesso!");

            },
            error : (e) =>{
              this.spinner.hide()
              console.log(e)
              this.toaster.error("Erro ao salvar o Evento !")
            },
            complete : () =>{
              this.spinner.hide();
              window.location.href = "eventos/lista";
            }
          }
        )
        }
        else
        {
          this.evento = {id : this.evento.id, ...this.form.value}
          this.eventoService.putEvento(this.evento.id, this.evento).subscribe(
            {
              next : () =>{
                this.toaster.success("Evento Alterado com sucesso!");
  
              },
              error : (e) =>{
                this.spinner.hide()
                console.log(e)
                this.toaster.error("Erro ao Alterar o Evento !")
              },
              complete : () =>{
                this.spinner.hide();
                window.location.href = "eventos/lista";
              }
            }
          )
        }
      
    }
  }

}
