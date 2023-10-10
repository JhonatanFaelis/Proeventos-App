import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidarSenha } from 'src/app/Helpers/validar-senha';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit{


  form! : FormGroup;

  get f (): any{
    return this.form.controls;
   }

   

  ngOnInit(): void {
    this.validarFormulario();
  }

  public validarFormulario () : void {
    const formOptions: AbstractControlOptions = {
      validators: ValidarSenha.MustMatch('senha', 'confirmarSenha')
     }
    this.form = new FormGroup({
      nome : new FormControl('',Validators.required),
      sobreNome : new FormControl('',Validators.required),
      email : new FormControl('',[Validators.required, Validators.email]),
      usuario : new FormControl('',Validators.required),
      senha : new FormControl('',Validators.required),
      confirmarSenha : new FormControl('',Validators.required)
    }, formOptions)
  }



}
