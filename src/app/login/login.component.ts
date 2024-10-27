import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import {  Client } from '../models/Client.model';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup
  constructor(
    private fb: FormBuilder,
    private service:CrudService,
    private router:Router,private toast:NgToastService
  ) { 
    let formControls = {
      email: new FormControl('',[
        Validators.required,
        Validators.email
        
      ]),
      password: new FormControl('',[
        Validators.required,
       
      ])
    }

    this.loginForm = this.fb.group(formControls)
  }

  get email() { return this.loginForm.get('email') }
  get password() { return this.loginForm.get('password') }
  ngOnInit(): void {  let isLoggedIn = this.service.isLoggedIn();
    

    if (isLoggedIn) {
      this.router.navigate(['home']);
    } 
  }

  login() {
    let data = this.loginForm.value;
    console.log(data);
    let client = new Client(
     null,null,null,data.email,null,data.password);
    console.log(client);
    if (
  
      data.email == 0 ||
      data.password == 0
    )
    {
      this.toast.info({
        detail: 'Error Message',
        summary: 'Remplir votre champs',
      });
    } else {
  
      this.service.loginClient(client)
          
          this.toast.success({
            detail: 'Error Message',
            summary: 'bienvenue',
          });
          
        }
      
      
    }
    }



