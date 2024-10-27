import { Component } from '@angular/core';
import { Produit } from '../models/Produit.model';
import { Router } from '@angular/router';
import { CrudService } from '../service/crud.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent {
  p:number=1;
collection:any[];
reserverForm:FormGroup
  isLoggedIn:boolean
  messageCommande=""
  IsloggedIn:boolean

 
    listProduit : Produit[]
    constructor(private service:CrudService,private router:Router,private fb:FormBuilder) { 
      
     }

  
    
  
  //reservation 
    reserver(event:any)
    {
      this.messageCommande=`<div class="alert alert-primary" role="alert">
      Veuillez patienter ...
    </div>`
      console.log(event)
      let rq:any={}
     
      rq.idClient=Number(localStorage.getItem("idC")) 
      rq.idProduit=event.id
    
     
    
     
      console.log(rq)
     
     
      this.service.commandeFromApi(rq).subscribe((data:any)=>{
        this.router.navigate(['mecommande']).then(() => {
          window.location.reload()
        })
      
        this.messageCommande=`<div class="alert alert-success" role="alert">
      Réservé avec succès
    </div>`
      }, err=>{
        this.messageCommande=`<div class="alert alert-warning" role="alert">
       Erreur, Veuillez réssayer !! 
      </div>`
  
      })
      setTimeout(() => {
        this.messageCommande=""
      }, 3000);
    }
  
      connexion()
      {
        this.router.navigate(['/login'])
      }
    
  
  
   
  
  
  
    ngOnInit(): void {
      this.service.getProduit().subscribe(produit => {
        this.listProduit = produit 
        this.isLoggedIn=this.service.isLoggedIn()
      })
    }
   

  }


