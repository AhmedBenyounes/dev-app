import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';

import { Client } from '../models/Client.model';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  ClientForm:FormGroup
  constructor(private service :CrudService,private router:Router,private fb:FormBuilder,private toast:NgToastService) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
      prenom: new FormControl('',[
        Validators.required,]),
      
      email: new FormControl('',[
          Validators.required,
        Validators.email]),
      password: new FormControl('',[
        Validators.required,]),
      tel: new FormControl('',[
          Validators.required,]),}
     this.ClientForm = this.fb.group(formControls)
   }
   get nom() {return this.ClientForm.get('nom');} 
  get prenom() { return this.ClientForm.get('prenom');}
  
  get email() {return this.ClientForm.get('email');}
  get tel() { return this.ClientForm.get('tel');}
  get password() {return this.ClientForm.get('password');}
  
  
   addNewClient() {
    let data = this.ClientForm.value;
    console.log(data);
    let client = new Client(
     undefined, data.nom,data.prenom,data.email,data.tel,data.password);
    console.log(client);
    
    if (
      data.nom == 0 ||
      data.prenom == 0||
     
      data.email == 0 ||
      
      data.tel == 0 ||
      data.password == 0 
      
    ) {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
    this.service.addclient(client).subscribe(
      res=>{
        console.log(res);
        this.toast.success({
          detail: 'Succes Message',
          summary: 'Message est Envoyée',
        });
        
       this.router.navigate(['/login']);
      },
      err=>{
        console.log(err);
        this.toast.error({
          detail: 'Error Message',
          summary: 'Probléme de Serveur',
        }); }
    )
  
    }
  }
  
  
    ngOnInit(): void {
    }
 
  }
