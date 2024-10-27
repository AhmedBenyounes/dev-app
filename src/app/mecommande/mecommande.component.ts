import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-mecommande',
  templateUrl: './mecommande.component.html',
  styleUrls: ['./mecommande.component.css']
})
export class MecommandeComponent {
 
  listProduit:any=[]
    constructor(private service:CrudService , private toaster : NgToastService , private router : Router) { }
    
    ngOnInit(): void {
      this.service.getAllCommandebyClientId().subscribe((data:any)=>{
        console.log(data)
        this.listProduit=data;
      })
    }
}
